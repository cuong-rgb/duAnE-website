// copy menu for mobile
function copyMenu(){
    // copy inside .dpt-cat to .departments
    var dptCategory = document.querySelector('.dpt-cat');
    var dptPlace = document.querySelector('.departments');
    dptPlace.innerHTML = dptCategory.innerHTML;

    // copy inside nav to nav
    var mainNav = document.querySelector('.header-nav nav'); 
    var navPlace = document.querySelector('.off-canvas nav')
    navPlace.innerHTML = mainNav.innerHTML;

    // copy .header-top .wrapper to .thetop-nav
    var topNav = document.querySelector('.header-top .wrapper');
    var topPlace = document.querySelector('.off-canvas .thetop-nav');
    topPlace.innerHTML = topNav.innerHTML;
}
copyMenu();


// show mobile menu 
const menuButton = document.querySelector('.trigger'),
      closeButton = document.querySelector('.t-close'),
      addClass = document.querySelector('.site');
menuButton.addEventListener('click' , function() {
    addClass.classList.toggle('showmenu');
})

closeButton.addEventListener('click', function() {
    addClass.classList.remove('showmenu');
})




// Show sub menu on mobile
const submenu = document.querySelectorAll('.has-child .icon-small');
//duyệt qua mỗi phần tử trong danh sách submenu đã chọn ở trên và thêm một sự kiện click cho mỗi phần tử và khi sự kiện này xảy ra, 
//nó gọi hàm toggle
submenu.forEach((menu) => menu.addEventListener('click' , toggle)) ;

function toggle(e){
    e.preventDefault(); // ngăn chặn hành vi mặc định của sự kiện click, ngăn trình duyệt thực hiện hành động mặc định của nó khi một phần tử được click
    
    //  duyệt qua mỗi phần tử (item) trong submenu. Nếu phần tử không phải là phần tử được click (item != this), 
    //  nó sẽ tìm phần tử cha gần nhất có class là 'has-child' của item đó và loại bỏ class 'expand' của phần tử cha (nếu có). 
    //  Điều này giúp đảm bảo chỉ một submenu được mở mỗi lần.
    submenu.forEach((item) => item != this ? item.closest('.has-child').classList.remove('expand') : null);
    if (this.closest('.has-child').classList !='expand');
    this.closest('.has-child').classList.toggle('expand');
}


// auto Slider
var counter = 0;
const lst_h4 = document.querySelectorAll('.slider .slide .item .text-content h4');
const lst_h2 = document.querySelectorAll('.slider .slide .item .text-content h2');
const lst_a = document.querySelectorAll('.slider .slide .item .text-content a');

setInterval(function(){
    if(counter > 0){
        lst_h4[counter-1].classList.remove('animation1');
        lst_h2[counter-1].classList.remove('animation2');
        lst_a[counter-1].classList.remove('animation3');
    }
    if (counter > 3) {
        counter = 0;
    }
    document.getElementById('radio'+(counter+1)).checked = true;
    lst_h4[counter].classList.add('animation1');
    lst_h2[counter].classList.add('animation2');
    lst_a[counter].classList.add('animation3');
    counter++;
}, 6000) ; 


// show search bottom menu
const searchButton = document.querySelector('.t-search'),
      tClose = document.querySelector('.search-close'),
      showClass = document.querySelector('.site');
      
searchButton.addEventListener('click', function(){
    showClass.classList.toggle('show-search');
})
tClose.addEventListener('click',function(){
    showClass.classList.remove('show-search');
})


// show dpt menu
const dptButton = document.querySelector('.dpt-cat .dpt-trigger'),
      dptClass = document.querySelector('.site');
dptButton.addEventListener('click',function(){
    dptClass.classList.toggle('showdpt');
})


//slider using swiper
const swiper = new Swiper('.swiper', {
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },  
});


// product image slider
var productThumb = new Swiper('.small-image', {
    loop: true, 
    spaceBetween: 10, 
    slidesPerView: 3, 
    freeMode: true,
    watchSlidesProgress: true, 
    breakpoints: {
        481:{
            spaceBetween: 32,
        }
    }
});

var productBig = new Swiper('.big-image',{
    loop: true,
    autoHeight: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    thumbs:{
        swiper: productThumb,
    }
})

// stock products bar width percentage
var stocks = document.querySelectorAll('.products .stock');
for(let x = 0; x < stocks.length; x++){
    let stock = parseInt(stocks[x].dataset.stock , 10),
    available = parseInt(stocks[x].querySelector('.qty-available').innerHTML.replace(/,/g, '') ,10),
    sold =  parseInt(stocks[x].querySelector('.qty-sold').innerHTML.replace(/,/g, '') ,10),
    percent = sold*100/stock;

    stocks[x].querySelector('.available').style.width = percent + '%';
}

// show cart on click
const divtoShow = '.mini-cart';
const divPopup = document.querySelector(divtoShow);
const divTrigger = document.querySelector('.cart-trigger');
divTrigger.addEventListener('click',() => {
    setTimeout(() => {
        if(!divPopup.classList.contains('show')){
            divPopup.classList.add('show');
        }
    })
})
//close by click outside
document.addEventListener('click',(e) => {
    const isClosest = e.target.closest(divtoShow);
    if(!isClosest && divPopup.classList.contains('show')){
        divPopup.classList.remove('show');
    }
})



// show modal on load 
window.onload = function() {
    document.querySelector('.page-checkout').classList.toggle('showmodal')
}
document.querySelector('.modalclose').addEventListener('click',function(){
    document.querySelector('.page-checkout').classList.remove('showmodal')
})

