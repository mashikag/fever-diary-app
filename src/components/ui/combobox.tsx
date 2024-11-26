"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type OptionType = {
  id: string;
  label: string;
};

type ComboboxProps = {
  value: string;
  options: OptionType[];
  onChange: (id: string) => void;
  onCreateNew: (id: string) => Promise<string>;
  placeholder?: string;
  searchPlaceholder?: string;
};

export default function Combobox({
  value,
  options,
  onChange,
  onCreateNew,
  placeholder = "Select option...",
  searchPlaceholder = "Search option...",
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleSelect = (currentId: string) => {
    if (currentId !== value) {
      onChange(currentId);
    }

    setOpen(false);
  };

  const handleCreateNew = async () => {
    const newOptionId = await onCreateNew(inputValue);
    handleSelect(newOptionId);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? options.find((option) => option.id === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            className="h-9"
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>
              {inputValue === "" ? (
                "Start typing to create new..."
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left text-sm"
                  onClick={handleCreateNew}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create new &quot;{inputValue}&quot;
                </Button>
              )}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.id}
                  onSelect={handleSelect}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
