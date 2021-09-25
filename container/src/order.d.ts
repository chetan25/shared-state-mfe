declare module "order/OrderApp" { 
    const mountOrder: (el: HTMLElement, options: {}) => {
      onContainerNavigate: any
    }; 
   
    export { mountOrder }; 
  } 