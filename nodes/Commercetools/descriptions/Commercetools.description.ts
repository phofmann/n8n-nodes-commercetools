import type { INodeProperties, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

import {
	productAdditionalFields,
	productDraftFields,
	productIdentificationFields,
	productOperations,
} from '../properties/product.properties';
import {
	categoryAdditionalFields,
	categoryBaseFields,
	categoryOperations,
} from '../properties/category.properties';
import { customerOperations, customerFields } from './customer.description';
import {
	cartOperations,
	cartIdentificationFields,
	cartDraftFields,
	cartAdditionalFields,
} from '../properties/cart.properties';
import {
	orderOperations,
	orderIdentificationFields,
	orderDraftFields,
	orderAdditionalFields,
} from '../properties/order.properties';
import {
	discountCodeAdditionalFields,
	discountCodeBaseFields,
	discountCodeDraftFields,
	discountCodeOperations,
} from '../properties/discountCode.properties';
import {
	cartDiscountAdditionalFields,
	cartDiscountBaseFields,
	cartDiscountDraftFields,
	cartDiscountOperations,
} from '../properties/cartDiscount.properties';
import {
	productDiscountAdditionalFields,
	productDiscountBaseFields,
	productDiscountDraftFields,
	productDiscountOperations,
} from '../properties/productDiscount.properties';

// Existing resource field - UPDATED with trigger option
const resourceField: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Cart',
			value: 'cart',
		},
		{
			name: 'Cart Discount',
			value: 'cartDiscount',
		},
		{
			name: 'Category',
			value: 'category',
		},
		{
			name: 'Customer',
			value: 'customer',
		},
		{
			name: 'Discount Code',
			value: 'discountCode',
		},
		{
			name: 'Order',
			value: 'order',
		},
		{
			name: 'Product',
			value: 'product',
		},
		{
			name: 'Product Discount',
			value: 'productDiscount',
		},
		{
			name: 'Product Event', // Trigger resource
			value: 'productEvent',
		},
	],
	default: 'product',
};

// Product event selector (shows only for productEvent)
const productEventField: INodeProperties = {
	displayName: 'Event',
	name: 'event',
	type: 'options',
	required: true,
	default: 'productPublished',
	placeholder: 'Select product event',
	options: [
		{ name: 'Created', value: 'productCreated' },
		{ name: 'Deleted', value: 'productDeleted' },
		{ name: 'Published', value: 'productPublished' },
		{ name: 'Unpublished', value: 'productUnpublished' },
		{ name: 'Updated', value: 'productUpdated' },
	],
	displayOptions: {
		show: {
			resource: ['productEvent'],
		},
	},
	description: 'Event type to listen for via webhook. CommerceTools will POST to generated URL.',
};

const sharedProductCategoryFields: INodeProperties[] = [
	// UPDATE: Hide version/actions for triggers
	{
		displayName: 'Version',
		name: 'version',
		type: 'number',
		typeOptions: {
			minValue: 0,
		},
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['product', 'category', 'cart', 'discountCode'],
				operation: [
					'update',
					'updateByKey',
					'delete',
					'deleteByKey',
					'updateInStore',
					'updateInStoreByKey',
					'deleteInStore',
					'deleteInStoreByKey',
				],
			},
		},
		description: 'Current version of the resource to ensure optimistic concurrency control',
	},
	{
		displayName: 'Actions (JSON)',
		name: 'actions',
		type: 'json',
		default: '[]',
		description: 'Update actions to apply to the resource',
		displayOptions: {
			show: {
				resource: ['product', 'category', 'cart', 'discountCode'],
				operation: ['update', 'updateByKey', 'updateInStore', 'updateInStoreByKey'],
			},
		},
	},
];

const nodeGroup: Pick<INodeTypeDescription, 'group'> = {
	group: ['transform'],
};

export const commercetoolsDescription: INodeTypeDescription = {
	displayName: 'Commercetools',
	name: 'commercetools',
	icon: 'file:Commercetools.svg',
	...nodeGroup,
	version: 1,
	description:
		'Interact with Products, Categories, Customers and Product Events (create/publish/update/unpublish/delete)',
	defaults: {
		name: 'Commercetools',
	},
	inputs: [NodeConnectionTypes.Main],
	outputs: [NodeConnectionTypes.Main],
	usableAsTool: true,
	credentials: [
		{
			name: 'commerceToolsOAuth2Api',
			required: true,
		},
	],
	// Webhook configuration
	webhooks: [
		{
			name: 'default',
			httpMethod: 'POST',
			responseMode: 'onReceived',
			path: 'commercetools-events',
			ndvHideUrl: false,
			restartWebhook: true,
		},
	],
	properties: [
		resourceField,
		productEventField,
		// UPDATE displayOptions to hide action ops for triggers
		...productOperations.map((op) => ({
			...op,
			displayOptions: {
				...op.displayOptions,
				show: {
					...op.displayOptions?.show,
					resource: ['product'], // Hide for productEvent
				},
			},
		})),
		...categoryOperations.map((op) => ({
			...op,
			displayOptions: {
				...op.displayOptions,
				show: {
					...op.displayOptions?.show,
					resource: ['category'],
				},
			},
		})),
		...customerOperations.map((op) => ({
			...op,
			displayOptions: {
				...op.displayOptions,
				show: {
					...op.displayOptions?.show,
					resource: ['customer'],
				},
			},
		})),
		...cartOperations.map((op) => ({
			...op,
			displayOptions: {
				...op.displayOptions,
				show: {
					...op.displayOptions?.show,
					resource: ['cart'],
				},
			},
		})),
		...cartDiscountOperations.map((op) => ({
			...op,
			displayOptions: {
				...op.displayOptions,
				show: {
					...op.displayOptions?.show,
					resource: ['cartDiscount'],
				},
			},
		})),
		...discountCodeOperations.map((op) => ({
			...op,
			displayOptions: {
				...op.displayOptions,
				show: {
					...op.displayOptions?.show,
					resource: ['discountCode'],
				},
			},
		})),
		...orderOperations.map((op) => ({
			...op,
			displayOptions: {
				...op.displayOptions,
				show: {
					...op.displayOptions?.show,
					resource: ['order'],
				},
			},
		})),
		...productDiscountOperations.map((op) => ({
			...op,
			displayOptions: {
				...op.displayOptions,
				show: {
					...op.displayOptions?.show,
					resource: ['productDiscount'],
				},
			},
		})),
		...cartAdditionalFields,
		...cartDiscountAdditionalFields,
		...cartDiscountBaseFields,
		...cartDiscountDraftFields,
		...cartDraftFields,
		...cartIdentificationFields,
		...categoryAdditionalFields,
		...categoryBaseFields,
		...customerFields,

		...discountCodeAdditionalFields,
		...discountCodeBaseFields,
		...discountCodeDraftFields,

		...orderAdditionalFields,
		...orderDraftFields,
		...orderIdentificationFields,

		...productDiscountAdditionalFields,
		...productDiscountBaseFields,
		...productDiscountDraftFields,

		...productAdditionalFields,
		...productDraftFields,
		...productIdentificationFields,
		...sharedProductCategoryFields,
	],
};
