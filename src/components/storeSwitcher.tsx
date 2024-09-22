"use client";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Store } from "@prisma/client";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
	Check,
	ChevronsUpDown,
	PlusCircle,
	Store as StoreIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "./ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
	typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
	items?: Store[];
}

export default function StoreSwitcher({
	items = [],
	className,
}: StoreSwitcherProps) {
	const [open, setOpen] = useState<boolean>(false);
	const storeModal = useStoreModal();
	const params = useParams();
	const router = useRouter();
	const formattedItems = items.map((item) => ({
		label: item.name,
		value: item.id,
	}));

	const currentStore = formattedItems.find(
		(item) => item.value === params.storeId
	);
	const onStoreSelection = (store: { label: string; value: string }) => {
		setOpen(false);
		router.push(`/${store.value}`);
	};
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					role="combobox"
					aria-expanded={open}
					aria-label="Select a store"
					className={cn("w-[200px] justify-between", className)}
				>
					<StoreIcon className="w-4 h-4 mr-2" />
					{currentStore?.label}
					<ChevronsUpDown className="w-4 h-4 ml-auto opacity-50 shrink-0" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] px-0 py-0">
				<Command>
					<CommandList>
						<CommandInput placeholder="search store..." />
						<CommandEmpty>No stores found</CommandEmpty>
						<CommandGroup heading="Stores">
							{formattedItems.map((item) => (
								<CommandItem
									key={item.value}
									onSelect={() => onStoreSelection(item)}
									className="text-sm"
								>
									<StoreIcon className="w-4 h-4 mr-2" />
									{item.label}
									<Check
										className={cn(
											"h-4 w-4 ml-auto",
											item.value === currentStore?.value
												? "opacity-100"
												: "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
					<CommandSeparator />
					<CommandList>
						<CommandGroup>
							<CommandItem
								className="cursor-pointer hover:opacity-90 transition-all"
								onSelect={() => {
                                    setOpen(false)
                                    storeModal.onOpen()
                                }}
							>
								<PlusCircle className="mr-2 w-4 h-4" />
								Create new store
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
