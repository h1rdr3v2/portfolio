import { usePage } from "@inertiajs/react"
import type { SharedProps } from "@/types"

/** The identity block from `config/site.php`, shared with every page. */
export function useSite() {
	return usePage<SharedProps>().props.site
}
