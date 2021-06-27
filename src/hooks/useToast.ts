import toast from "react-hot-toast";

export function useToastWarning(msg: string) {
    toast.error(msg, {
        style: {
            background: "#F6E03B",
            color: "#FFF"
        },
        iconTheme: {
            primary: '#000',
            secondary: '#fff',
        },
        icon: '⚠️'
    });
}

export function useToastError(msg: string) {
    toast.error(msg, {
        style: {
            background: "#F53E2A",
            color: "#FFF",
        },
        iconTheme: {
            primary: "#FFF",
            secondary: "#F56565",
        },
    });
}

export function useToastSuccess(msg: string) {
    toast.success(msg, {
        style: {
            background: "#4DA824",
            color: "#FFF"
        },
        iconTheme: {
            primary: "#FFF",
            secondary: "#a0cafa"
        },
    });
}