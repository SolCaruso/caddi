import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ShopHeader from "./ShopHeader";
import { filterSections } from "./ShopFilter";
import Link from "next/link";

interface ShopSidebarProps {
  onFilterChange: (filterId: string, isChecked: boolean) => void;
  selectedFilters: string[];
}

export default function ShopSidebar({ onFilterChange, selectedFilters }: ShopSidebarProps) {
  return (
    <div className="lg:w-1/5 hidden lg:block">
      <div className="mb-8">
        <ShopHeader />
      </div>

      {/* Filter Section */}
      <Accordion
        type="multiple"
        className="w-full"
      >
        {filterSections.map((section) => (
          <AccordionItem key={section.value} value={section.value}>
            <AccordionTrigger>{section.label}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3">
              {section.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={option.id} 
                    checked={selectedFilters.includes(option.id)}
                    onCheckedChange={(checked) => onFilterChange(option.id, checked as boolean)}
                  />
                  <Label htmlFor={option.id}>{option.label}</Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Custom Divot Builder Button */}
      <div className="mt-6">
        <Link 
          href="/build" 
          className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-caddi-blue border border-caddi-blue rounded-full hover:bg-caddi-blue hover:text-white transition-all duration-200"
        >
          Custom Divot Builder
        </Link>
      </div>
    </div>
  );
} 