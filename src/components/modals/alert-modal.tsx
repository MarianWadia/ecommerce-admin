"use client";
import React, { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";

interface alertModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	loading: boolean;
}

export default function AlertModal({
	isOpen,
	onClose,
	onConfirm,
	loading,
}: alertModalProps) {
	const [isMounted, setIsMounted] = useState<boolean>(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Are you sure?"
			description="This action cannot be undone"
		>
			<div className="w-full flex flex-row items-center justify-end pt-6 gap-x-2">
				<Button onClick={onClose} variant="outline" disabled={loading}>
					Cancel
				</Button>
				<Button onClick={onConfirm} variant="destructive" disabled={loading}>
					Continue
				</Button>
			</div>
		</Modal>
	);
}
