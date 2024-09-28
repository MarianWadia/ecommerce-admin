import React, { useEffect, useState } from "react";

export default function UseOrigin() {
	const [mounted, setMounted] = useState(false);
	const origin =
		typeof window !== "undefined" && window.location.origin
			? window.location.origin
			: "";
	useEffect(() => {
		if (!mounted) {
			setMounted(true);
		}
	}, [mounted]);
	if (!mounted) {
		return "";
	}

	return origin;
}
