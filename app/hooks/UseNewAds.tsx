"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchNewAds, postNewAds } from "@/app/services/NewAds";
import { toast } from "react-hot-toast";
import { uploadImages } from "../services/mediaService";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export const usePostNewAds = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: (newAd: any) => postNewAds(newAd),
        onSuccess: () => {
            toast.success("🎉 تم إنشاء الاعلان بنجاح");
            router.push('/');
        },
        onError: (error: any) => {
            toast.error(error.message || "❌ فشل التسجيل. تأكد من البيانات وحاول مرة أخرى.");
            console.log("errrrrrror:", error);
        },
    });
};

export const usePostNewImages = () => {
    return useMutation({
        mutationFn: (files: File[]) => uploadImages(files),
        onSuccess: () => {
            toast.success("🎉 تم رفع الصور بنجاح");
        },
        onError: (error: any) => {
            toast.error(error.message || "❌ فشل رفع الصور. تأكد من البيانات وحاول مرة أخرى.");
            console.log("errrrrrrorImages:", error);
        },
    });
}
export const useGetNewAds = (slug?: string) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["newads", slug],
        queryFn: () => fetchNewAds(slug),
    });

    return { newads: data, isLoading, isError };
}

export function useNewAdsBySlug(slug: string) {
    const { data, error, isLoading } = useSWR(
        slug ? `newads-${slug}` : null,
        () => fetchNewAds(slug)
    );

    return {
        product: data?.data?.[0],
        isLoading,
        isError: !!error,
    };
}