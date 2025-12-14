const addBtns = document.querySelectorAll('.add');
    const cartBtn = document.getElementById('openCart');
    const cartPanel = document.getElementById('cartPanel');
    const cartList = document.getElementById('cartList');
    const countEl = document.getElementById('count');
    const totalEl = document.getElementById('total');

    let cart = {};

    function formatPrice(n){return '$' + Number(n).toFixed(2)}

    addBtns.forEach(b=>b.addEventListener('click', e=>{
      const card = e.target.closest('.card');
      const id = card.dataset.id;
      const title = card.dataset.title;
      const price = parseFloat(card.dataset.price);
      if(!cart[id]) cart[id] = {id,title,price,qty:0};
      cart[id].qty += 1;
      renderCart();
    }));

    cartBtn.addEventListener('click', ()=>{
      const isOpen = cartPanel.style.display === 'block';
      cartPanel.style.display = isOpen ? 'none' : 'block';
      cartPanel.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
    });

    function renderCart(){
      cartList.innerHTML = '';
      const items = Object.values(cart);
      if(items.length === 0){
        cartList.innerHTML = '<div class="cart-empty">Your cart is empty.</div>';
        countEl.textContent = 0; totalEl.textContent = formatPrice(0);
        return;
      }
      let total = 0; let count = 0;
      items.forEach(it=>{
        total += it.price * it.qty; count += it.qty;
        const div = document.createElement('div'); div.className = 'cart-item';
        div.innerHTML = `
          <div class="small-cover">B</div>
          <div style="flex:1">
            <div style="font-weight:700">${it.title}</div>
            <div style="font-size:13px;color:#666">${formatPrice(it.price)} x ${it.qty}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
            <button class="secondary inc" data-id="${it.id}">+</button>
            <button class="secondary dec" data-id="${it.id}">-</button>
          </div>
        `;
        cartList.appendChild(div);
      });
      countEl.textContent = count; totalEl.textContent = formatPrice(total);

      // attach inc/dec
      cartList.querySelectorAll('.inc').forEach(b=>b.addEventListener('click',e=>{
        const id = e.target.dataset.id; cart[id].qty +=1; renderCart();
      }));
      cartList.querySelectorAll('.dec').forEach(b=>b.addEventListener('click',e=>{
        const id = e.target.dataset.id; cart[id].qty -=1; if(cart[id].qty<=0) delete cart[id]; renderCart();
      }));
    }

    document.getElementById('checkout').addEventListener('click', ()=>{
      if(Object.keys(cart).length===0){alert('Cart is empty'); return}
      alert('Checkout - this is a demo. Total: ' + totalEl.textContent);
    });

    // initial render
    renderCart();