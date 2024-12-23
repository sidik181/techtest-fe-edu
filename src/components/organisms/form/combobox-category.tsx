"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { CheckIcon, ChevronDown } from "lucide-react";
import { Category } from "@/features/category-product/services";

type Field = {
  value: { _id: string; ct_name: string } | string;
  onChange: (value:  string ) => void;
  onBlur: () => void;
  ref: (instance: HTMLInputElement | null) => void;
};

export default function ComboboxCategory({
  field,
  categories,
  placeholder,
  emptyData,
  disabled,
}: {
  categories: Category[];
  field: Field;
  placeholder: string;
  emptyData: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const currentValue =
    typeof field.value === "string" ? field.value : field.value._id;

  const filteredData = categories.filter((data) =>
    data.ct_name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const selectedItem = categories.find((data) => data._id === currentValue);
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between overflow-hidden"
          disabled={disabled}
        >
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {selectedItem ? selectedItem.ct_name : placeholder}
          </span>{" "}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={4}
        className="p-0 min-w-[var(--radix-trigger-width)]"
      >
        <Command>
          <CommandInput
            placeholder={placeholder}
            className="h-9 w-full"
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            {filteredData.length === 0 ? (
              <CommandEmpty className="p-2 text-sm text-muted-foreground">
                {emptyData}
              </CommandEmpty>
            ) : (
              <CommandGroup className="p-2 text-sm">
                {filteredData.map((data) => (
                  <CommandItem
                    key={data._id}
                    value={data._id}
                    onSelect={() => {
                      field.onChange(data._id);
                      setOpen(false);
                    }}
                  >
                    {data.ct_name}
                    <CheckIcon
                      className={cn(
                        "ml-auto w-4",
                        currentValue === data._id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
