import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ListFilter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const filterSections = [
  {
    value: "divot-tools",
    label: "Divot Tools",
    options: [
      { id: "divot-tools-all", label: "All Divot Tools" },
      { id: "divot-tools-premium", label: "Premium Collection" },
      { id: "divot-tools-custom", label: "Custom Work" },
    ],
  },
  {
    value: "clothes",
    label: "Clothes",
    options: [
      { id: "t-shirts", label: "T-Shirts", defaultChecked: true },
      { id: "hoodies", label: "Hoodies" },
      { id: "hats", label: "Hats" },
    ],
  },
  {
    value: "accessories",
    label: "Accessories",
    options: [
      { id: "golf-bags", label: "Golf Bags" },
      { id: "golf-gloves", label: "Golf Gloves" },
      { id: "golf-balls", label: "Golf Balls" },
    ],
  },
];

export default function ShopFilter() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 text-black/50 font-medium text-sm border rounded-full px-4 py-1.75 cursor-pointer hover:text-black/70 group">
          <ListFilter className="h-4 w-4 text-black/50 group-hover:text-black/70" />
          Filters
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Filters</h4>
            <p className="text-muted-foreground text-sm">
              Filter products by category and type.
            </p>
          </div>
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={["clothes"]}
          >
            {filterSections.map((section) => (
              <AccordionItem key={section.value} value={section.value}>
                <AccordionTrigger>{section.label}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-3">
                  {section.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`mobile-${option.id}`} 
                        defaultChecked={option.defaultChecked}
                      />
                      <Label htmlFor={`mobile-${option.id}`}>{option.label}</Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </PopoverContent>
    </Popover>
  );
} 