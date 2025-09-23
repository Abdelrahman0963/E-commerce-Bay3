export async function uploadImages(files: (File | Blob)[]): Promise<number[]> {
  try {
    if (!Array.isArray(files) || files.length === 0) return [];

    const formData = new FormData();
    files.forEach((file, idx) => {
      if (file instanceof File || file instanceof Blob) {
        const fileName = (file instanceof File && file.name) ? file.name : `file-${Date.now()}-${idx}`;
        formData.append("files", file as File, fileName);
      } else {
        console.warn("🚨 uploadImages: skipped non-file item:", file);
      }
    });

    const res = await fetch("http://localhost:1337/api/upload", {
      method: "POST",
      body: formData,
    });

    const json = await (async () => {
      try { return await res.json(); } catch (e) { return null; }
    })();

    if (!res.ok) {
      const msg = json ? JSON.stringify(json) : await res.text();
      throw new Error(`Upload failed: ${msg}`);
    }

    let ids: number[] = [];
    if (Array.isArray(json)) {
      ids = json.map((f: any) => f.id).filter((id: any) => typeof id === "number");
    } else if (json && Array.isArray(json.data)) {
      ids = json.data.map((d: any) => d.id ?? d).filter((id: any) => typeof id === "number");
    } else if (json && Array.isArray(json.body)) {
      ids = json.body.map((f: any) => f.id).filter((id: any) => typeof id === "number");
    } else {
      console.warn("uploadImages: unexpected upload response", json);
    }

    return ids;
  } catch (err: any) {
    console.error("Upload error:", err);
    throw err;
  }
}
