import type { Photo } from "@/lib/photos";

const LINK = "underline decoration-current/30 underline-offset-2 hover:text-red-signal";

/**
 * Credit line for a photo. Wikimedia Commons photos get the linked author,
 * licence and the note that they were turned black and white — what their
 * CC licences ask for. `compact` drops the source/edit note, for lists of
 * several credits.
 */
export default function PhotoCredit({ photo, compact }: { photo: Photo; compact?: boolean }) {
  if (photo.source !== "commons") return <span>{photo.credit}</span>;
  return (
    <span>
      {compact ? "" : "Foto: "}
      <a href={photo.sourceUrl} target="_blank" rel="noopener" className={LINK}>
        {photo.author}
      </a>{" "}
      (
      <a href={photo.licenseUrl} target="_blank" rel="noopener license" className={LINK}>
        {photo.license}
      </a>
      ){compact ? "" : " · Wikimedia Commons · en blanco y negro"}
    </span>
  );
}
