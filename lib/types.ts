export interface TicketType {
    id: string;
    name: string;
    price: number;
}

export interface CartItem extends TicketType {
    quantity: number;
}

export interface OrderData {
    name: string;
    email: string;
    phone: string;
    items: CartItem[];
    subtotal: number;
    serviceFee: number;
    total: number;
}

export const TICKET_TYPES: TicketType[] = [
    {
        id: 'dance-floor',
        name: 'Dance Floor',
        price: 2500,
    },
    {
        id: 'backstage',
        name: 'Backstage',
        price: 5000,
    },
    {
        id: 'vip',
        name: 'VIP',
        price: 10000,
    },
];
