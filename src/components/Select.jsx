import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

export function Select({ options, placeholder, defaultValue, onValueChange }) {
  return (
    <SelectPrimitive.Root
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      {/* Botão de Disparo (Trigger) */}
      <SelectPrimitive.Trigger className="inline-flex items-center justify-between gap-3 bg-bg-element border border-border-focus text-zinc-200 text-sm rounded-lg px-4 py-2 min-w-[200px] focus:outline-none focus:border-brand-primary cursor-pointer font-primary transition-colors data-[placeholder]:text-zinc-500">
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className="text-zinc-400">
          <ChevronDown className="w-4 h-4" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      {/* Conteúdo do Menu (Portal garante que o menu renderize por cima de tudo) */}
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="overflow-hidden bg-bg-surface border border-border-subtle rounded-lg shadow-xl animate-in fade-in-50 duration-100 z-[3] min-w-[200px]">
          <SelectPrimitive.ScrollUpButton className="flex items-center justify-center h-6 bg-bg-surface text-zinc-400 cursor-default">
            <ChevronUp className="w-4 h-4" />
          </SelectPrimitive.ScrollUpButton>

          <SelectPrimitive.Viewport className="p-1">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className="relative flex items-center justify-between pl-8 pr-4 py-2 text-sm text-zinc-300 font-primary rounded-md cursor-pointer select-none outline-none focus:bg-bg-element focus:text-white data-[state=checked]:text-brand-primary data-[state=checked]:font-medium transition-colors"
              >
                <SelectPrimitive.ItemText>
                  {option.label}
                </SelectPrimitive.ItemText>

                {/* Indicador de Check lateral se o item estiver ativo */}
                <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center justify-center">
                  <Check className="w-4 h-4 text-brand-primary" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>

          <SelectPrimitive.ScrollDownButton className="flex items-center justify-center h-6 bg-bg-surface text-zinc-400 cursor-default">
            <ChevronDown className="w-4 h-4" />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
