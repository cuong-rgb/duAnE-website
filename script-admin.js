// show dashboard
const dptButton = document.querySelector('.dpt-cat .dpt-trigger'),
dptClass = document.querySelector('.site');
dptButton.addEventListener('click',function(){
dptClass.classList.toggle('showdpt');
if (!dptClass.classList.contains('showdpt')){
dptClass.classList.add('full');
}
else{
dptClass.classList.remove('full');
}
});

//show submenu on dashboard
const submenu = document.querySelectorAll('.has-child .icon-small');
submenu.forEach((menu) => menu.addEventListener('click' , toggle)) ;
function toggle(e){
e.preventDefault(); 
submenu.forEach((item) => item != this ? item.closest('.has-child').classList.remove('expand') : null);
this.closest('.has-child').classList.toggle('expand');
};

// show Products Management 
const manageProbtn = document.querySelector('.manage-pro'),
prolst = document.querySelector('.site');
manageProbtn.addEventListener('click',function(){
prolst.classList.add('show');
});

//show modal product management and IUD on modal-product
var dataProduct = [] ;

// function Check valid input
function KiemTraSo(str){
    const regex = /\d/ ; // \d là ký tự đại diện trong biểu thức chính quy cho bất kỳ chữ số nào (0-9)
    return regex.test(str);
}

function KiemTraKituDacBiet(str){
    const regex = /[!@#$%^&*(),.?":{}|<>]/ ;
    return regex.test(str);
}

function KiemTraGiaSanPham(str){
    const regex = /^\d+(\.\d+)?$/ ; //Phần thập phân tùy chọn. Nếu có dấu chấm thì phải có ít nhất một chữ số sau dấu chấm. 
                                    //Dấu chấm và phần thập phân này là tùy chọn do dấu ?.
    return regex.test(str);
}

function KiemTraGiaBang0(str){
    const regex = /^0(\.00?)?$/; // (\.00?)?: Phần thập phân tùy chọn, có thể là .0 hoặc .00.
    return regex.test(str); 
}

function CheckID(){
    let check = true; 
    let id = document.getElementById('iditem').value ;
    if (id == ''){
        document.getElementById('err-id').style.display = 'inline-block';
        document.getElementById('err-id').setAttribute('title','ID cannot empty ');
        check = false;
    }
    else if (dataProduct.some((i) => i.Id == id)) // Thực hiện hành động khi tìm thấy ID
    {
        document.getElementById('err-id').style.display = 'inline-block';
        document.getElementById('err-id').setAttribute('title','ID Item already exist ');
        check = false;
    }
    else if (KiemTraKituDacBiet(id)){
        document.getElementById('err-id').style.display = 'inline-block';
        document.getElementById('err-id').setAttribute('title','ID cannot contain special chars');
        check = false;
    }
    else{
        document.getElementById('err-id').style.display = 'none';
        check = true;
    }
    return check;

}
function CheckName(){
    let check = true ;
    let name = document.getElementById('name').value;
    if(name == ''){
        document.getElementById('err-name').style.display = 'inline-block';
        document.getElementById('err-name').setAttribute('title','Name cannot empty');
        check = false;
    }
    else if (name.length > 50){
        document.getElementById('err-name').style.display = 'inline-block';
        document.getElementById('err-name').setAttribute('title','Name must not exceed 50 chars');
        check = false;
    }
    else if (KiemTraSo(name) || KiemTraKituDacBiet(name)){
        document.getElementById('err-name').style.display = 'inline-block';
        document.getElementById('err-name').setAttribute('title','Name cannot contain numbers or special chars');
        check = false;
    }
    else{
        document.getElementById('err-name').style.display = 'none';
        check = true;
    }
    return check;
}
function CheckBrand(){
    let check = true ;
    let brand = document.getElementById('brand').value;
    if(brand == ''){
        document.getElementById('err-brand').style.display = 'inline-block';
        document.getElementById('err-brand').setAttribute('title','Brand cannot empty');
        check = false;
    }
    else if (brand.length > 50){
        document.getElementById('err-brand').style.display = 'inline-block';
        document.getElementById('err-brand').setAttribute('title','Brand must not exceed 50 chars');
        check = false;
    }
    else if (KiemTraKituDacBiet(brand)){
        document.getElementById('err-brand').style.display = 'inline-block';
        document.getElementById('err-brand').setAttribute('title','Brand cannot special chars');
        check = false;
    }
    else{
        document.getElementById('err-brand').style.display = 'none';
        check = true;
    }
    return check;
}

function CheckPrice(){
    let check = true ;
    let price = document.getElementById('price').value;
    if(price == ''){
        document.getElementById('err-price').style.display = 'inline-block';
        document.getElementById('err-price').setAttribute('title','price cannot empty');
        check = false;
    }
    else if (!KiemTraGiaSanPham(price)){
        document.getElementById('err-price').style.display = 'inline-block';
        document.getElementById('err-price').setAttribute('title','Invalid Price');
        check = false;
    }
    else if(KiemTraGiaBang0(price)){
        document.getElementById('err-price').style.display = 'inline-block';
        document.getElementById('err-price').setAttribute('title', 'Price is not $0.00');
        check = false;
    }
    else{
        document.getElementById('err-price').style.display = 'none';
        check = true;
    }
    return check;
}
function CheckStockQty(){
    let check = true ;
    let stockqty = document.getElementById('stockqty').value;
    console.log(stockqty);
    if(stockqty == ''){
        document.getElementById('err-stockqty').style.display = 'inline-block';
        document.getElementById('err-stockqty').setAttribute('title','stockqty cannot empty');
        check = false;
    }
    else if (stockqty.includes('.') || stockqty.includes(',')){

        // includes(): string: Kiểm tra một chuỗi con có ở trong một chuỗi cha hay không 
        //             arr: Kiểm tra một phần tử con có ở trong mảng cha hay không

        document.getElementById('err-stockqty').style.display = 'inline-block';
        document.getElementById('err-stockqty').setAttribute('title','Invalid stock quantity');
        check = false;
    }
    else{
        document.getElementById('err-stockqty').style.display = 'none';
        check = true;
    }
    return check;
}

function DeleteItem(id){
    if(confirm("Do you want delete product ?")){
        for(let i = 0 ; i < dataProduct.length ; i++){
            if (dataProduct[i].Id == id){
                dataProduct.splice(i,1);
                Render();
                break;
            }
        }
    }
}

function Render(){
    let tableRows = ``;
    for(let i = 0 ; i < dataProduct.length ; i++){
        tableRows += `
            <tr>
                <td>${dataProduct.indexOf(dataProduct[i]) + 1}</td>
                <td>
                    <strong>${dataProduct[i].Id}</strong>
                </td>
                <td>
                    ${dataProduct[i].Name}
                </td>
                <td>
                    ${dataProduct[i].Brand}
                </td>
                <td>$${dataProduct[i].Price}</td>
                <td>${dataProduct[i].StockQty}</td>
                <td><a href="#" class="item-view"><i class="ri-eye-line"></i></a></td>
                <td><a href="#0" class="item-edit" onclick="showModalProduct('${dataProduct[i].Id}')"><i class="ri-refresh-line"></i></a></td>
                <td><a href="#0" class="item-delete" onclick="DeleteItem('${dataProduct[i].Id}')"><i class="ri-delete-bin-6-line"></i></a></td>
            </tr>`
    }
    document.querySelector('#pro-table tbody').innerHTML = ``;
    document.querySelector('#pro-table tbody').innerHTML += tableRows;
}

function Clear(){
    document.getElementById('iditem').value = '';
    document.getElementById('name').value = '';
    document.getElementById('brand').value = '';
    document.getElementById('price').value = '';
    document.getElementById('stockqty').value = '';
}


function Submit(){
    let item_id = document.getElementById('iditem').value,
        item_name = document.getElementById('name').value,
        item_brand = document.getElementById('brand').value,
        item_price = document.getElementById('price').value,
        item_stockQty = document.getElementById('stockqty').value;

    let item = {
        Id: item_id, 
        Name: item_name,
        Brand: item_brand,
        Price: item_price,
        StockQty: item_stockQty
    };

    let index = dataProduct.findIndex((a) => a.Id == item.Id);

    if(index >= 0 ){
        if (CheckName() && CheckBrand() && CheckPrice() && CheckStockQty()){
            dataProduct.splice(index,1,item);
        }
        else{
            alert("Sunmit Failed! Please enter accurate and complete information!");
        }
    }
    else{
        if(CheckID() && CheckName() && CheckBrand() && CheckPrice() && CheckStockQty()){
            dataProduct.push(item);
            Clear();
        }
        else{
            alert("Sunmit Failed! Please enter accurate and complete information!");
        }
    }
    Render();
}


function showModalProduct(id){
    if(id != ''){
        for(let i = 0 ; i < dataProduct.length ; i++){
            if (dataProduct[i].Id == id){
                document.getElementById('iditem').setAttribute('readonly','true');
                document.getElementById('iditem').removeAttribute('onblur');
                document.getElementById('iditem').style.color = '#7c899a';
                document.getElementById('iditem').value = dataProduct[i].Id;
                document.getElementById('name').value = dataProduct[i].Name;
                document.getElementById('brand').value = dataProduct[i].Brand;
                document.getElementById('price').value = dataProduct[i].Price;
                document.getElementById('stockqty').value = dataProduct[i].StockQty;
                break;
            }
        }
    }
    else{
        document.getElementById('iditem').setAttribute('readonly','false');
        document.getElementById('iditem').removeAttribute('readonly');
        document.getElementById('iditem').style.color = 'initial';
        Clear();
    }
    document.querySelector('.admin').classList.toggle('showmodal');
}

document.querySelector('.modalclose').addEventListener('click',function(){
document.querySelector('.admin').classList.remove('showmodal');
});


document.getElementById('submit').addEventListener("click" ,function(e){
    e.preventDefault(); // ngăn chặn hành vi mặc định của button
})





