// import NextImage from "next/image";
import { IncrementProductQuantity } from "@/components/atoms/IncrementProductQuantity";
import { formatPrice } from "@/utils";
import { CartDeleteProductButton } from "@/components/atoms/CartDeleteProductButton";
import { CartPaymentButon } from "@/components/atoms/CartPaymentButton";
import { type CartFragment } from "@/gql/graphql";

type CartProductListProps = {
	cart: CartFragment;
};

export const CartProductList = ({ cart }: CartProductListProps) => {
	const total = cart.orderItems.reduce(
		(acc, item) => acc + item.quantity * (item.product?.price ?? 0),
		0,
	);

	return (
		<>
			{cart.orderItems.map(
				(item) =>
					item.product && (
						<li key={item.product.id}>
							<article className="grid grid-cols-3 sm:grid-cols-6 sm:gap-5">
								{/*<div className="col-span-1 flex items-center justify-center">*/}
								{/*	{item.product.images[0] && (*/}
								{/*		<NextImage*/}
								{/*			src={item.product.images[0].url}*/}
								{/*			alt={item.product.images[0].fileName}*/}
								{/*			width={100}*/}
								{/*			height={100}*/}
								{/*		/>*/}
								{/*	)}*/}
								{/*</div>*/}
								<span className="col-span-3 flex items-center justify-start">
									{item.product.name}
								</span>
								<div className="col-span-1 flex items-center justify-center">
									<IncrementProductQuantity
										itemId={item.id}
										quantity={item.quantity}
										price={item.product.price}
									/>
								</div>
								<span className="col-span-1 flex items-center justify-center text-center">
									{formatPrice(item.product.price / 100)}
								</span>
								<div className="col-span-1 flex items-center justify-center p-5">
									<CartDeleteProductButton itemId={item.id} />
								</div>
							</article>
						</li>
					),
			)}
			<li className="flex items-center justify-between bg-neutral-200 p-5">
				<div className="text-2xl">
					Total: <span className="font-semibold">{formatPrice(total / 100)}</span>
				</div>
				<CartPaymentButon cart={cart} />
			</li>
		</>
	);
};
