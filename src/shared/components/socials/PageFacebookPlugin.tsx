import { PAGE_FACEBOOK_URL } from "@/shared/settings/CommonConfig";

const PageFacebookPlugin = () => {
  return (
    <iframe
      className="w-[100%] flex items-center justify-center my-5"
      src={`https://www.facebook.com/plugins/page.php?href=${PAGE_FACEBOOK_URL}&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1829476810737411`}
      scrolling="no"
      height={500}
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    ></iframe>
  );
};

export default PageFacebookPlugin;
