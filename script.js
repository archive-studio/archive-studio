const data = {
  tshirts: {
    label: "T-SHIRTS",
    images: [
      ["assets/tshirt-01.jpg","Endless / Find Your Self"],
      ["assets/tshirt-02.jpg","Bad Habit / Midnight Lust"],
      ["assets/tshirt-03.jpg","Saint"],
      ["assets/tshirt-04.jpg","Urban Anxiety"],
      ["assets/tshirt-05.jpg","Smoke Makes You Better Rich"]
    ]
  },
  pants: {
    label: "PANTS",
    images: [
      ["assets/pants-01.jpg","Anxiety Denim Shorts"],
      ["assets/pants-02.jpg","Red / Devotional"],
      ["assets/pants-03.jpg","Saint Denim"],
      ["assets/pants-04.jpg","Endless / Find Your Self"]
    ]
  }
};

const gallery = document.getElementById("gallery");
const galleryLabel = document.getElementById("galleryLabel");
const galleryCount = document.getElementById("galleryCount");
const cards = document.querySelectorAll(".category-card");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxNumber = document.getElementById("lightboxNumber");
const lightboxCaption = document.getElementById("lightboxCaption");

function render(category){
  const selected = data[category];
  galleryLabel.textContent = selected.label;
  galleryCount.textContent = `01 — ${String(selected.images.length).padStart(2,"0")}`;
  gallery.innerHTML = "";
  selected.images.forEach(([src,caption],i)=>{
    const item=document.createElement("button");
    item.className="gallery-item";
    item.dataset.num=String(i+1).padStart(2,"0");
    item.setAttribute("aria-label",`Open ${caption}`);
    item.innerHTML=`<img src="${src}" alt="${caption}">`;
    item.addEventListener("click",()=>openLightbox(src,caption,i+1,selected.images.length));
    gallery.appendChild(item);
  });
}
function openLightbox(src,caption,num,total){
  lightboxImage.src=src;
  lightboxImage.alt=caption;
  lightboxNumber.textContent=`${String(num).padStart(2,"0")} / ${String(total).padStart(2,"0")}`;
  lightboxCaption.textContent=caption;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
cards.forEach(card=>{
  card.addEventListener("click",()=>{
    cards.forEach(c=>c.classList.remove("active"));
    card.classList.add("active");
    gallery.animate([{opacity:.2,transform:"translateY(12px)"},{opacity:1,transform:"translateY(0)"}],{duration:500,easing:"cubic-bezier(.2,.7,.2,1)"});
    render(card.dataset.category);
    document.getElementById("galleryWrap").scrollIntoView({behavior:"smooth",block:"start"});
  });
});
document.getElementById("lightboxClose").addEventListener("click",closeLightbox);
lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLightbox()});
render("tshirts");
