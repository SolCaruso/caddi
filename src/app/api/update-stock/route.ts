import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json()

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid items data' },
        { status: 400 }
      )
    }

    const updates = []

    for (const item of items) {
      if (item.variantId) {
        // Update variant stock
        const { data: variantData, error: variantError } = await supabase
          .from('product_variants')
          .select('stock')
          .eq('id', item.variantId)
          .single()

        if (variantError) {
          console.error('Error fetching variant stock:', variantError)
          updates.push({ 
            itemId: item.id, 
            variantId: item.variantId, 
            success: false, 
            error: variantError.message 
          })
          continue
        }

        const newStock = Math.max((variantData?.stock || 0) - item.quantity, 0)
        
        const { error: updateError } = await supabase
          .from('product_variants')
          .update({ stock: newStock })
          .eq('id', item.variantId)

        if (updateError) {
          console.error('Error updating variant stock:', updateError)
          updates.push({ 
            itemId: item.id, 
            variantId: item.variantId, 
            success: false, 
            error: updateError.message 
          })
        } else {
          updates.push({ 
            itemId: item.id, 
            variantId: item.variantId, 
            success: true 
          })
        }
      } else {
        // Update product stock
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('stock')
          .eq('id', item.id)
          .single()

        if (productError) {
          console.error('Error fetching product stock:', productError)
          updates.push({ 
            itemId: item.id, 
            success: false, 
            error: productError.message 
          })
          continue
        }

        const newStock = Math.max((productData?.stock || 0) - item.quantity, 0)
        
        const { error: updateError } = await supabase
          .from('products')
          .update({ stock: newStock })
          .eq('id', item.id)

        if (updateError) {
          console.error('Error updating product stock:', updateError)
          updates.push({ 
            itemId: item.id, 
            success: false, 
            error: updateError.message 
          })
        } else {
          updates.push({ 
            itemId: item.id, 
            success: true 
          })
        }
      }
    }

    const hasErrors = updates.some(update => !update.success)

    return NextResponse.json({
      success: !hasErrors,
      updates,
      message: hasErrors 
        ? 'Some stock updates failed' 
        : 'Stock updated successfully'
    })

  } catch (error) {
    console.error('Error updating stock:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
