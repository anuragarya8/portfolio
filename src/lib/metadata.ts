import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

/** Root / default site metadata */
export const defaultMetadata: Metadata = buildMetadata();
