import * as yup from "yup";
import { isAddress } from "viem";

export type DrawerAnchor = "left" | "bottom" | "right" | "top";

export const validationSchema = yup.object({
    recipient: yup
        .string()
        .required("Recipient address is required")
        .test("is-address", "Invalid wallet address", (value) => (value ? isAddress(value) : false)),
    amount: yup
        .number()
        .typeError("Amount must be a valid number")
        .required("Amount is required")
        .positive("Amount must be greater than 0"),
});

export const createWalletSchema = yup.object().shape({
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
});

export type FormData = yup.InferType<typeof validationSchema>;
export type CreateWalletFormData = yup.InferType<typeof createWalletSchema>;

export interface Interaction {
    to: `0x${string}`;
    contract: string;
    functionName: string;
    functionArgs: string[];
    data: `0x${string}`;
}

export interface TransactionIntent {
    id: string;
    interactions: Interaction[];
    response?: {
        transactionHash: string;
    };
}
