import { useState, useRef, useEffect } from "react";

const sampleDocument = {
  name: "SampleDocument.pdf",
  hash: "0x1234567890abcdef1234567890abcdef12345678",
  url: "https://thefusebase.com/wp-content/uploads/2023/05/Contractor-Agreement-791x1024.png",
  pages: 5,
};

const signatureImage =
  "https://upload.wikimedia.org/wikipedia/commons/2/27/Narf_signature.png";

const loadImage = (url: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };

    img.onerror = reject;

    img.src = url;
  });
};

export default function Sign() {
  const [page, setPage] = useState(1);
  const [doc, setDoc] = useState(sampleDocument);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > doc.pages) return;
    setPage(newPage);
  };

  const handleDownloadClick = () => {
    console.log("Download clicked");
  };

  const handleShareClick = () => {
    console.log("Share clicked");
  };

  useEffect(() => {
    const img: any = imgRef.current;
    const canvas: any = canvasRef.current;
    if (!img || !canvas) return;

    const dpr = window.devicePixelRatio || 1;

    const setupCanvas = () => {
      const displayWidth = img.clientWidth;
      const displayHeight = img.clientHeight;
      const internalWidth = Math.max(1, Math.floor(displayWidth * dpr));
      const internalHeight = Math.max(1, Math.floor(displayHeight * dpr));

      canvas.width = internalWidth;
      canvas.height = internalHeight;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    if (img.complete && img.clientWidth && img.clientHeight) {
      setupCanvas();
    }
    img.addEventListener("load", setupCanvas);

    window.addEventListener("resize", setupCanvas);

    return () => {
      img.removeEventListener("load", setupCanvas);
      window.removeEventListener("resize", setupCanvas);
    };
  }, [page]);

  // Redraw markers when positions change
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas || !img) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const clearW = canvas.width / dpr;
    const clearH = canvas.height / dpr;
    ctx.clearRect(0, 0, clearW, clearH);

    // Draw rectangle if two positions exist
    if (positions.length === 2) {
      const [start, end] = positions;
      const rectX = Math.min(start.x, end.x);
      const rectY = Math.min(start.y, end.y);
      const rectW = Math.abs(end.x - start.x);
      const rectH = Math.abs(end.y - start.y);

      ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.fillRect(rectX, rectY, rectW, rectH);
      ctx.strokeRect(rectX, rectY, rectW, rectH);
      loadImage(signatureImage).then((signatureImageElement) => {
        ctx.drawImage(signatureImageElement, rectX, rectY, rectW, rectH);
      });
    } else if (positions.length === 1) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const start = positions[0];
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const rectX = Math.min(start.x, mouseX);
        const rectY = Math.min(start.y, mouseY);
        const rectW = Math.abs(mouseX - start.x);
        const rectH = Math.abs(mouseY - start.y);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

        ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
        ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
        ctx.lineWidth = 1;
        ctx.fillRect(rectX, rectY, rectW, rectH);
        ctx.strokeRect(rectX, rectY, rectW, rectH);
      };

      canvas.addEventListener("mousemove", handleMouseMove);

      return () => {
        canvas.removeEventListener("mousemove", handleMouseMove);
      };
    }

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPositions([]);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [positions]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();
    const x = e.clientX - rect?.left;
    const y = e.clientY - rect?.top;
    if (positions.length <= 1) {
      setPositions((prev: any) => [...prev, { x, y }]);
    } else {
      setPositions([{ x, y }]);
    }
  };

  const signDocument = () => async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (positions.length < 2) {
      alert(
        "Please select a signature area by clicking and dragging on the document."
      );
      setPositions([]);
      return;
    }
    console.log(`Document signed at positions: ${JSON.stringify(positions)}`);
    // TODO: Handle the actual signing logic.
    setPositions([]);
  };

  return (
    <div className="flex flex-col bg-gray-800">
      {/* Top bar with Download and Share */}
      <div className="flex justify-between items-center p-4 bg-gray-700 shadow">
        <div className="font-semibold sm:text-sm xs:text-xs lg:text-lg">
          {doc.name}
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded btn-secondary text-white hover:bg-blue-600 transition"
            onClick={handleDownloadClick}
          >
            Download
          </button>
          <button
            className="px-3 py-1 rounded bg-gray-300 text-gray-700 hover:bg-gray-300 transition"
            onClick={handleShareClick}
          >
            Share
          </button>
        </div>
      </div>

      {/* Document Preview */}
      <div className="flex-1 flex flex-col p-4 justify-center items-center">
        <div className="relative w-800 max-sm:w-full max-w-4xl bg-white rounded shadow p-4 flex flex-col items-center justify-center">
          <div id="image-container" className="relative">
            <img
              ref={imgRef}
              src="https://thefusebase.com/wp-content/uploads/2023/05/Contractor-Agreement-791x1024.png"
              alt="Document Preview"
              className="w-full object-contain rounded mb-4 border"
            />
            <canvas
              id="overlay"
              ref={canvasRef}
              onClick={handleClick}
              className="absolute top-0 left-0 w-full h-full cursor-crosshair"
            ></canvas>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <button
              className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-500"
              aria-label="Previous page"
              onClick={() => changePage(page - 1)}
            >
              &lt;
            </button>
            <span className="text-sm text-gray-700">
              Page {page} of {sampleDocument.pages}
            </span>
            <button
              className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-500"
              aria-label="Next page"
              onClick={() => changePage(page + 1)}
            >
              &gt;
            </button>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 w-full font-bold">
            <button
              className="flex-1 px-4 py-2 rounded btn-primary  transition"
              onClick={signDocument()}
            >
              Sign
            </button>
            <button className="flex-1 px-4 py-2 rounded btn-secondary transition">
              Request Signature
            </button>
            <button className="flex-1 px-4 py-2 rounded bg-red-700 hover:bg-red-600 transition">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
