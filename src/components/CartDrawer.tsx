import { FormEvent, useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import {
  CurrencyCode,
  FREE_DELIVERY_THRESHOLD_PKR,
  Perfume,
  STANDARD_DELIVERY_FEE_PKR,
  formatPrice,
} from '../data/perfumes';
import { ResilientImage } from './ResilientImage';

export interface CartItem {
  perfume: Perfume;
  volume: string;
  unitPricePkr: number;
  quantity: number;
}

export interface OrderRecord {
  orderNumber: string;
  createdAt: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: 'COD' | 'CARD';
  items: {
    name: string;
    brand: string;
    volume: string;
    quantity: number;
    unitPricePkr: number;
  }[];
  subtotalPkr: number;
  deliveryFeePkr: number;
  totalPkr: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  orders: OrderRecord[];
  currency: CurrencyCode;
  onClose: () => void;
  onUpdateQuantity: (perfumeId: string, volume: string, delta: number) => void;
  onRemoveItem: (perfumeId: string, volume: string) => void;
  onCompleteOrder: (order: OrderRecord) => void;
}

type DrawerStep = 'bag' | 'checkout' | 'confirmed' | 'history';

export function CartDrawer({
  isOpen,
  items,
  orders,
  currency,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCompleteOrder,
}: CartDrawerProps) {
  const [step, setStep] = useState<DrawerStep>('bag');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'CARD'>('COD');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lahore');
  const [postalCode, setPostalCode] = useState('');
  const [formError, setFormError] = useState('');
  const [latestOrder, setLatestOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    if (step === 'confirmed' && items.length > 0) {
      setStep('bag');
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose, items.length, step]);

  if (!isOpen) return null;

  const subtotalPkr = items.reduce(
    (sum, item) => sum + item.unitPricePkr * item.quantity,
    0
  );
  const deliveryFeePkr =
    subtotalPkr === 0 || subtotalPkr >= FREE_DELIVERY_THRESHOLD_PKR
      ? 0
      : STANDARD_DELIVERY_FEE_PKR;
  const totalPkr = subtotalPkr + deliveryFeePkr;
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD_PKR - subtotalPkr);
  const progressPct = Math.min(100, (subtotalPkr / FREE_DELIVERY_THRESHOLD_PKR) * 100);

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim() || !postalCode.trim()) {
      setFormError('Please complete all delivery verification fields.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 7) {
      setFormError('Please enter a valid contact phone number for courier confirmation.');
      return;
    }

    setFormError('');
    const orderNum = `LP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderRecord = {
      orderNumber: orderNum,
      createdAt: new Date().toLocaleDateString('en-PK', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      customerName: fullName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
      paymentMethod,
      items: items.map((item) => ({
        name: item.perfume.name,
        brand: item.perfume.brand,
        volume: item.volume,
        quantity: item.quantity,
        unitPricePkr: item.unitPricePkr,
      })),
      subtotalPkr,
      deliveryFeePkr,
      totalPkr,
    };

    setLatestOrder(newOrder);
    onCompleteOrder(newOrder);
    setStep('confirmed');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping bag and checkout"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FAF9F6] h-full flex flex-col border-l border-[#E6E2D8] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E6E2D8] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {(step === 'checkout' || step === 'history') && (
              <button
                type="button"
                onClick={() => setStep('bag')}
                aria-label="Back to shopping bag"
                className="p-1.5 -ml-1.5 text-[#57534E] hover:text-[#1C1917] rounded-md cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
              {step === 'bag' && 'Your Bag'}
              {step === 'checkout' && 'Delivery & Payment'}
              {step === 'confirmed' && 'Order Confirmed'}
              {step === 'history' && 'Order History'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {orders.length > 0 && step === 'bag' && (
              <button
                type="button"
                onClick={() => setStep('history')}
                className="text-xs font-medium text-[#8C6D46] hover:text-[#1C1917] underline underline-offset-4 cursor-pointer mr-2"
              >
                Orders ({orders.length})
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close bag drawer"
              className="p-2 text-[#57534E] hover:text-[#1C1917] rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step 1: Bag */}
        {step === 'bag' && (
          <>
            {items.length > 0 && (
              <div className="px-6 py-3 bg-[#F3F1EC] border-b border-[#E6E2D8]">
                <p className="text-xs text-[#1C1917] mb-1.5 tabular-nums">
                  {remainingForFreeDelivery === 0
                    ? 'Complimentary insured courier delivery unlocked.'
                    : `Add ${formatPrice(remainingForFreeDelivery, currency)} more for complimentary delivery.`}
                </p>
                <div className="w-full h-1 bg-[#E6E2D8] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8C6D46] transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <ShoppingBag className="w-10 h-10 text-[#A8A29E] mb-3" strokeWidth={1.25} />
                  <p className="font-serif text-2xl font-medium text-[#1C1917]">
                    Your bag is empty
                  </p>
                  <p className="mt-1.5 text-sm text-[#57534E] max-w-xs">
                    Select a signature Eau de Parfum or Extrait de Parfum to begin your order.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 px-5 py-2.5 text-sm font-medium bg-[#1C1917] text-[#FAF9F6] hover:bg-[#332E2A] rounded-md transition-colors cursor-pointer"
                  >
                    Browse Fragrances
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.perfume.id}-${item.volume}`}
                    className="flex gap-4 p-3.5 bg-white border border-[#E6E2D8] rounded-lg"
                  >
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-[#F3F1EC] shrink-0">
                      <ResilientImage
                        src={item.perfume.image}
                        alt={item.perfume.name}
                        fallbackLabel={item.perfume.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[11px] uppercase tracking-wider text-[#78716C] truncate">
                            {item.perfume.brand}
                          </p>
                          <p className="text-sm font-semibold text-[#1C1917] truncate">
                            {item.perfume.name}
                          </p>
                          <p className="text-xs text-[#57534E]">{item.volume}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.perfume.id, item.volume)}
                          aria-label={`Remove ${item.perfume.name}`}
                          className="p-1 text-[#78716C] hover:text-[#1C1917] cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="inline-flex items-center border border-[#E6E2D8] rounded bg-[#FAF9F6]">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.perfume.id, item.volume, -1)
                            }
                            aria-label="Decrease item quantity"
                            className="p-1.5 text-[#1C1917] hover:bg-[#EFECE4] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-medium tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.perfume.id, item.volume, 1)
                            }
                            aria-label="Increase item quantity"
                            className="p-1.5 text-[#1C1917] hover:bg-[#EFECE4] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-[#1C1917] tabular-nums">
                          {formatPrice(item.unitPricePkr * item.quantity, currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-[#E6E2D8] space-y-3">
                <div className="flex justify-between text-sm text-[#57534E] tabular-nums">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotalPkr, currency)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#57534E] tabular-nums">
                  <span>Insured Delivery</span>
                  <span>
                    {deliveryFeePkr === 0
                      ? 'Complimentary'
                      : formatPrice(deliveryFeePkr, currency)}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#F0ECE4] flex justify-between text-base font-semibold text-[#1C1917] tabular-nums">
                  <span>Total</span>
                  <span>{formatPrice(totalPkr, currency)}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('checkout')}
                  className="w-full mt-2 py-3 px-4 text-sm font-medium bg-[#1C1917] text-[#FAF9F6] hover:bg-[#332E2A] rounded-md transition-colors cursor-pointer"
                >
                  Proceed to Checkout
                </button>
                <p className="text-[11px] text-center text-[#78716C]">
                  Cash on Delivery (COD) &amp; Bank Transfer accepted nationwide.
                </p>
              </div>
            )}
          </>
        )}

        {/* Step 2: Checkout Form */}
        {step === 'checkout' && (
          <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              <div>
                <span className="block text-xs font-medium uppercase tracking-wider text-[#57534E] mb-2">
                  Payment Method
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`px-3 py-2.5 text-xs font-medium rounded-md border text-left transition-colors cursor-pointer ${
                      paymentMethod === 'COD'
                        ? 'bg-[#1C1917] text-[#FAF9F6] border-[#1C1917]'
                        : 'bg-white text-[#1C1917] border-[#E6E2D8]'
                    }`}
                  >
                    Cash on Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CARD')}
                    className={`px-3 py-2.5 text-xs font-medium rounded-md border text-left transition-colors cursor-pointer ${
                      paymentMethod === 'CARD'
                        ? 'bg-[#1C1917] text-[#FAF9F6] border-[#1C1917]'
                        : 'bg-white text-[#1C1917] border-[#E6E2D8]'
                    }`}
                  >
                    Bank / Card Transfer
                  </button>
                </div>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label
                    htmlFor="checkout-name"
                    className="block text-xs font-medium text-[#1C1917] mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ayesha Siddiqui"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6E2D8] rounded-md text-[#1C1917] placeholder:text-[#A8A29E]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="block text-xs font-medium text-[#1C1917] mb-1"
                  >
                    Mobile Number (for courier verification)
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300 1234567"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6E2D8] rounded-md text-[#1C1917] placeholder:text-[#A8A29E]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-address"
                    className="block text-xs font-medium text-[#1C1917] mb-1"
                  >
                    Street Address
                  </label>
                  <textarea
                    id="checkout-address"
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House 14-B, Street 6, Gulberg III"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#E6E2D8] rounded-md text-[#1C1917] placeholder:text-[#A8A29E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="checkout-city"
                      className="block text-xs font-medium text-[#1C1917] mb-1"
                    >
                      City
                    </label>
                    <input
                      id="checkout-city"
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6E2D8] rounded-md text-[#1C1917]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="checkout-postal"
                      className="block text-xs font-medium text-[#1C1917] mb-1"
                    >
                      Postal Code
                    </label>
                    <input
                      id="checkout-postal"
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="54660"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6E2D8] rounded-md text-[#1C1917] placeholder:text-[#A8A29E]"
                    />
                  </div>
                </div>
              </div>

              {formError && (
                <p className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                  {formError}
                </p>
              )}

              <div className="p-4 bg-[#F3F1EC] rounded-lg border border-[#E6E2D8] space-y-2 text-xs">
                <div className="flex justify-between text-[#57534E] tabular-nums">
                  <span>Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                  <span>{formatPrice(subtotalPkr, currency)}</span>
                </div>
                <div className="flex justify-between text-[#57534E] tabular-nums">
                  <span>Delivery</span>
                  <span>
                    {deliveryFeePkr === 0
                      ? 'Complimentary'
                      : formatPrice(deliveryFeePkr, currency)}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E6E2D8] flex justify-between font-semibold text-sm text-[#1C1917] tabular-nums">
                  <span>
                    {paymentMethod === 'COD' ? 'Payable on Delivery' : 'Total Due'}
                  </span>
                  <span>{formatPrice(totalPkr, currency)}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border-t border-[#E6E2D8]">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm font-medium bg-[#1C1917] text-[#FAF9F6] hover:bg-[#332E2A] rounded-md transition-colors cursor-pointer"
              >
                Confirm Order · {formatPrice(totalPkr, currency)}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Confirmed Receipt */}
        {step === 'confirmed' && latestOrder && (
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#8C6D46] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#8C6D46]">
                  Order #{latestOrder.orderNumber} Confirmed — Preparing Shipment
                </p>
                <h3 className="font-serif text-2xl font-semibold text-[#1C1917] mt-1">
                  Thank you, {latestOrder.customerName}
                </h3>
                <p className="text-sm text-[#57534E] mt-1">
                  Our vault concierge will verify dispatch via {latestOrder.phone} within 2 hours.
                </p>
              </div>
            </div>

            <div className="p-4 bg-white border border-[#E6E2D8] rounded-lg space-y-3 text-sm">
              <p className="text-xs font-medium uppercase tracking-wider text-[#78716C]">
                Receipt Summary
              </p>
              <div className="space-y-2">
                {latestOrder.items.map((item, idx) => (
                  <div
                    key={`${item.name}-${idx}`}
                    className="flex justify-between gap-2 text-xs text-[#1C1917] tabular-nums"
                  >
                    <span>
                      {item.quantity}x {item.brand} {item.name} ({item.volume})
                    </span>
                    <span className="font-medium">
                      {formatPrice(item.unitPricePkr * item.quantity, currency)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-[#F0ECE4] space-y-1 text-xs text-[#57534E] tabular-nums">
                <div className="flex justify-between">
                  <span>Payment</span>
                  <span>
                    {latestOrder.paymentMethod === 'COD'
                      ? 'Cash on Delivery'
                      : 'Bank / Card Transfer'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Destination</span>
                  <span className="text-right">
                    {latestOrder.city}, {latestOrder.postalCode}
                  </span>
                </div>
                <div className="pt-2 flex justify-between font-semibold text-sm text-[#1C1917]">
                  <span>Total</span>
                  <span>{formatPrice(latestOrder.totalPkr, currency)}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setStep('bag');
                onClose();
              }}
              className="w-full py-3 px-4 text-sm font-medium bg-[#1C1917] text-[#FAF9F6] hover:bg-[#332E2A] rounded-md transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        )}

        {/* Past Orders History */}
        {step === 'history' && (
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
            {orders.map((ord) => (
              <div
                key={ord.orderNumber}
                className="p-4 bg-white border border-[#E6E2D8] rounded-lg space-y-2 text-xs"
              >
                <div className="flex items-center justify-between font-semibold text-[#1C1917]">
                  <span>Order #{ord.orderNumber}</span>
                  <span className="text-[#8C6D46]">{ord.createdAt}</span>
                </div>
                <p className="text-[#57534E]">
                  {ord.items.map((i) => `${i.quantity}x ${i.name} (${i.volume})`).join(', ')}
                </p>
                <div className="pt-2 border-t border-[#F0ECE4] flex justify-between text-[#1C1917] tabular-nums">
                  <span>{ord.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Card / Bank'}</span>
                  <span className="font-semibold">{formatPrice(ord.totalPkr, currency)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
