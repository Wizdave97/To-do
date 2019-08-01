import './app.css';
//To do List Item Component
function ListItem(item){
  this.checked=false;
  let div=document.createElement('div')
  let input=document.createElement('input')
  this.onChange=function(){
    this.checked=!this.checked
    div.classList.toggle('strike')
  }
  this.onChange=this.onChange.bind(this)
  input.type="checkbox"
  input.checked=this.checked;
  input.onchange=this.onChange;
  div.classList.add('input')
  input.classList.add('checkbox')
  div.insertAdjacentElement('afterbegin',input)
  div.insertAdjacentHTML('beforeEnd',item)
  this.div=div
  this.render=function(){
    return this.div
  }
}
//Model for storing State
function Model(){
  this.all=[];
}
Model.prototype.getAll=function(){
  return this.all
}
Model.prototype.addTo=function(value){
  this.all.push(value)
}

function Octopus(model){
  this.model=model
}

Octopus.prototype.getAll=function(){
  return this.model.getAll()
}

Octopus.prototype.addToModel=function(value){
  this.model.addTo(value)
}

// View controlling the rendered state
function View(octopus){
  this.route=1;
  this.octopus=octopus
  this.render=function(item){
    const card=document.querySelector('.card')
    let listItem=new ListItem(item)
    //let html=`<div id="${item}" class="input"><input name="${item}" class="checkbox" type="checkbox"/>${item}</div>`
    card.insertAdjacentElement('beforeEnd',listItem.render())
  }
  this.renderRoute=function(){
    const card=document.querySelector('.card')
    const allRoute=document.getElementById('all')
    const activeRoute=document.getElementById('active')
    const completedRoute=document.getElementById('completed')
    if(this.route==1){
      const todo=document.querySelector('[name="add"]')
      card.innerHTML=''
      allRoute.classList.add('active')
      activeRoute.classList.remove('active')
      completedRoute.classList.remove('active')
      todo.removeAttribute('disabled')
      const all=this.octopus.getAll()
      if (all.length!==0){
        for (let item of all){
          card.insertAdjacentElement('beforeEnd',item.render())
        }
      }
    }
    else if (this.route==2) {
      const todo=document.querySelector('[name="add"]')
      card.innerHTML=''
      allRoute.classList.remove('active')
      activeRoute.classList.add('active')
      completedRoute.classList.remove('active')
      todo.removeAttribute('disabled')
      const all=this.octopus.getAll()
      if (all.length!==0){
        for (let item of all){
          if(!item.checked){
            card.insertAdjacentElement('beforeEnd',item.render())
          }
        }
      }
    }
    else if (this.route==3) {
      const todo=document.querySelector('[name="add"]')
      card.innerHTML=''
      allRoute.classList.remove('active')
      activeRoute.classList.remove('active')
      completedRoute.classList.add('active')
      todo.setAttribute('disabled',true)
      const all=this.octopus.getAll()
      if (all.length!==0){

        for (let item of all){
          if(item.checked){
            card.insertAdjacentElement('beforeEnd',item.render())
          }
        }
      }
    }

  }
  this.init=function(){
    const todo=document.querySelector('[name="todo-item"]')
    const addButton=document.querySelector('[name="add"]')
    const allRoute=document.getElementById('all')
    const activeRoute=document.getElementById('active')
    const completedRoute=document.getElementById('completed')

    addButton.addEventListener('click',(event)=>{
      if(this.route===3){
        return
      }
      if (!todo.value) return
      this.octopus.addToModel(new ListItem(todo.value))
      this.render(todo.value)
    })
    allRoute.addEventListener('click',(event)=>{
      this.route=1;
      this.renderRoute()
    })
    activeRoute.addEventListener('click',(event)=>{
      this.route=2;
      this.renderRoute()
    })
    completedRoute.addEventListener('click',(event)=>{
      this.route=3;
      this.renderRoute()
    })
  }

  this.init()
}

// Start Event
window.addEventListener('DOMContentLoaded',function(){
  const newModel=new Model()
  const newOctopus=new Octopus(newModel)
  const newView=new View(newOctopus)
})
