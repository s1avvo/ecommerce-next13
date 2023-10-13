import NextImage from "next/image";
import { formatPrice } from "@/utils";
import { type OrderFragment } from "@/gql/graphql";

type OrderProductListProps = {
	order: OrderFragment;
};

export const OrderProductList = ({ order }: OrderProductListProps) => {
	return (
		<>
			{order.orderItems.map(
				(item) =>
					item.product && (
						<li key={item.product.id}>
							<article className="grid grid-cols-3 sm:grid-cols-4 sm:gap-5">
								<div className="col-span-1 flex items-center justify-center">
									{item.product.images[0] && (
										<NextImage
											src={item.product.images[0].url}
											alt={item.product.images[0].fileName}
											width={100}
											height={100}
										/>
									)}
								</div>
								<span className="col-span-2 flex items-center justify-start">
									{item.product.name}
								</span>
								<div className="col-span-1 flex gap-5">
									<span className=" flex items-center justify-center text-center">
										{item.quantity} qty.
									</span>
									<span className=" flex items-center justify-center text-center">|</span>
									<span className="flex items-center justify-center text-center">
										{formatPrice(item.product.price / 100)}
									</span>
								</div>
							</article>
						</li>
					),
			)}
		</>
	);
};
