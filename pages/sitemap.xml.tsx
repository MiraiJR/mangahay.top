import ComicService from "@/shared/services/comicService";
import { NextApiRequest, NextApiResponse } from "next";

function generateSiteMap({
  hostname,
  comics,
  genres,
}: {
  hostname: string;
  comics: Comic[];
  genres: Genre[];
}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
         <loc>${hostname}</loc>
       </url>
       <url>
         <loc>${hostname}/tim-kiem</loc>
       </url>
       <url>
         <loc>${hostname}/danh-sach-truyen?field=createdAt</loc>
       </url>
       <url>
         <loc>${hostname}/danh-sach-truyen?field=updatedAt</loc>
       </url>
       <url>
         <loc>${hostname}/dang-nhap</loc>
       </url>
       <url>
         <loc>${hostname}/dang-ky</loc>
       </url>
       ${comics
         .map((comic) => {
           return `<url><loc>${`${hostname}/truyen/${comic.slug}`}</loc></url>
         ${comic.chapters?.map((chapter) => {
           return `<url><loc>${hostname}/truyen/${comic.slug}/${chapter.slug}</loc></url>
          `;
         })}
       `;
         })
         .join("")}
         ${genres
           .map((genre) => {
             return `<url><loc>${`${hostname}/the-loai/${genre.slug}`}</loc></url>`;
           })
           .join("")}
     </urlset>
   `;
}

function SiteMap() {}

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const hostname = "https://mangahay.top";

  const comics = await ComicService.getComicsWithChapters();
  const genres = await ComicService.getGenres();

  const sitemap = generateSiteMap({
    hostname,
    comics: comics.data,
    genres: genres.data,
  });

  res.setHeader("Content-Type", "text/xml");

  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
