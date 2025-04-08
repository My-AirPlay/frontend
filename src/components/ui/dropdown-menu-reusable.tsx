"use client"

import React from "react"
import { cn } from "@/lib/utils"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Define the types for our dropdown items
export type DropdownItemType = {
  label: string
  onClick?: () => void
  icon?: React.ReactNode
  disabled?: boolean
  className?: string
  dividerTop?: boolean
  dividerBottom?: boolean
  subItems?: DropdownItemType[]
}

export type ReusableDropdownProps = {
  trigger: React.ReactNode
  items: DropdownItemType[]
  contentProps?: React.ComponentPropsWithoutRef<typeof DropdownMenuContent>
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
}

export function ReusableDropdownMenu({
  trigger,
  items,
  contentProps,
  align = "end",
  side = "bottom",
}: ReusableDropdownProps) {
  // Recursive function to render dropdown items
  const renderDropdownItems = (items: DropdownItemType[]) => {
    return items.map((item, index) => {
      const Icon = item.icon

      const key = `${item.label}-${index}`

      return (
        <React.Fragment key={key}>
          {item.dividerTop && <DropdownMenuSeparator />}

          {item.subItems ? (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className={cn(item.className)} disabled={item.disabled}>
                {Icon}
                {item.label}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>{renderDropdownItems(item.subItems)}</DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ) : (
            <DropdownMenuItem onClick={item.onClick} className={cn(item.className)} disabled={item.disabled}>
              {Icon}
              {item.label}
            </DropdownMenuItem>
          )}

          {item.dividerBottom && <DropdownMenuSeparator />}
        </React.Fragment>
      )
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align={align} side={side} {...contentProps}>
        {renderDropdownItems(items)}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

