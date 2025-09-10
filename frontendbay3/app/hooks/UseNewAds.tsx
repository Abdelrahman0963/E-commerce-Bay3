import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchNewAds, postNewAds } from "@/app/services/NewAds";
import { toast } from "react-hot-toast";


export const usePostNewAds = () => {
    return useMutation({
        mutationFn: (newAd: any) => postNewAds(newAd),
        onSuccess: () => {
            toast.success("🎉 تم إنشاء الاعلان بنجاح");
        },
        onError: (error: any) => {
            toast.error(error.message || "❌ فشل التسجيل. تأكد من البيانات وحاول مرة أخرى.");
            console.log("errrrrrror:", error);
        },
    });
};

export const useGetNewAds = (slug?: string) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["newads", slug],
        queryFn: () => fetchNewAds(slug),
        enabled: !!slug,
    });

    return { newads: data, isLoading, isError, error };
}