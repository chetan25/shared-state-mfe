import React, { useEffect, useRef } from 'react';
import { mountOrder } from 'order/OrderApp';
import { useHistory } from 'react-router-dom';

interface LocationProp {
    hash: string;
    key: string;
    pathname: string;
    search:string; 
}

const OrderApp = () => {
    const ref = useRef(null);
    const history = useHistory();

    console.log('order');

    useEffect(() => {
        if (ref.current) {
            const {onContainerNavigate} = mountOrder(ref.current!, {
                onNavigate: ({ pathname: newPathName }: LocationProp) => {
                    const { pathname } = history.location;
                    // to prevent from going into infinite loop of updating route form different locations, we put a check
                    if (pathname !== newPathName) {
                        history.push(newPathName);
                    }
                },
                initialPath: history.location.pathname
            });
    
            history.listen(onContainerNavigate);
        }
    }, []);

    return (
        <div id="order" ref={ref}></div>
    );
};

export default OrderApp;