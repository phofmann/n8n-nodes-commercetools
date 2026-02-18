import type { INodeProperties } from 'n8n-workflow';
import { productDiscountFields } from './productDiscount.constants';
import { resources } from '../resources.constants';

export const productDiscountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: productDiscountFields.operation,
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create product discount',
				description: 'Create a new product discount',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete product discount',
				description: 'Delete a product discount by ID',
			},
			{
				name: 'Delete By Key',
				value: 'deleteByKey',
				action: 'Delete product discount by key',
				description: 'Delete a product discount using its unique key',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get product discount',
				description: 'Retrieve a product discount by ID',
			},
			{
				name: 'Get By Key',
				value: 'getByKey',
				action: 'Get product discount by key',
				description: 'Retrieve a product discount using its key',
			},
			{
				name: 'Query',
				value: 'query',
				action: 'Query product discounts',
				description: 'Query for product discounts',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update product discount',
				description: 'Update a product discount by ID',
			},
			{
				name: 'Update By Key',
				value: 'updateByKey',
				action: 'Update product discount by key',
				description: 'Update a product discount by key',
			},
		],
		default: 'query',
		displayOptions: {
			show: {
				resource: [resources.productDiscount],
			},
		},
	},
];

export const productDiscountBaseFields: INodeProperties[] = [
	{
		displayName: 'Product Discount ID',
		name: productDiscountFields.productDiscountId,
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [resources.productDiscount],
				[productDiscountFields.operation]: ['get', 'update', 'delete'],
			},
		},
		description: 'Unique ID of the product discount to target',
	},
	{
		displayName: 'Product Discount Key',
		name: productDiscountFields.productDiscountKey,
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [resources.productDiscount],
				[productDiscountFields.operation]: ['getByKey', 'updateByKey', 'deleteByKey'],
			},
		},
		description: 'Unique key of the product discount to target',
	},
];

export const productDiscountDraftFields: INodeProperties[] = [
	{
		displayName: 'Product Discount Draft (JSON)',
		name: productDiscountFields.productDiscountDraft,
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: [resources.productDiscount],
				[productDiscountFields.operation]: ['create'],
			},
		},
		description:
			'JSON representation of the product discount draft to create, e.g. <code>{"name":{"en":"Summer Sale"},"value":{...},"predicate":"...","sortOrder":"0.9"}</code>',
	},
];

export const productDiscountAdditionalFields: INodeProperties[] = [
	{
		displayName: 'Actions (UI)',
		name: productDiscountFields.updateActions,
		type: 'fixedCollection',
		default: {},
		placeholder: 'Add Action',
		typeOptions: {
			multipleValues: true,
		},
		description: 'Define multiple update actions to perform on the product discount',
		displayOptions: {
			show: {
				resource: [resources.productDiscount],
				[productDiscountFields.operation]: ['update', 'updateByKey'],
			},
		},
		options: [
			{
				displayName: 'Action',
				name: 'action',
				values: [
					{
						displayName: 'Action Type',
						name: 'action',
						type: 'options',
						required: true,
						default: 'changeName',
						options: [
							{ name: 'Change Is Active', value: 'changeIsActive' },
							{ name: 'Change Name', value: 'changeName' },
							{ name: 'Change Predicate', value: 'changePredicate' },
							{ name: 'Change Sort Order', value: 'changeSortOrder' },
							{ name: 'Change Value', value: 'changeValue' },
							{ name: 'Set Description', value: 'setDescription' },
							{ name: 'Set Key', value: 'setKey' },
							{ name: 'Set Valid From', value: 'setValidFrom' },
							{ name: 'Set Valid From and Until', value: 'setValidFromAndUntil' },
							{ name: 'Set Valid Until', value: 'setValidUntil' },
						],
					},
					// Simplified fields for brevity. Add more fields for each action as needed.
					{
						displayName: 'Name',
						name: 'name',
						type: 'json',
						default: '{}',
						displayOptions: {
							show: {
								action: ['changeName'],
							},
						},
						description:
							'Localized names for the product discount, e.g. <code>{"en": "New Name"}</code>',
					},
					{
						displayName: 'Is Active',
						name: 'isActive',
						type: 'boolean',
						default: false,
						displayOptions: {
							show: {
								action: ['changeIsActive'],
							},
						},
						description: 'Whether the discount is active',
					},
				],
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: productDiscountFields.additionalFieldsQuery,
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: [resources.productDiscount],
				[productDiscountFields.operation]: ['query'],
			},
		},
		options: [
			{
				displayName: 'Expand',
				name: 'expand',
				type: 'string',
				default: '',
				description: 'Include additional resources by reference expansion',
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'string',
				default: '',
				description: 'Sorting expression for query results, e.g. <code>createdAt desc</code>',
			},
			{
				displayName: 'Where',
				name: 'where',
				type: 'string',
				default: '',
				description: 'Query predicate to filter results',
			},
		],
	},
	{
		displayName: 'Return All',
		name: productDiscountFields.returnAll,
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: [resources.productDiscount],
				[productDiscountFields.operation]: ['query'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: productDiscountFields.limit,
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
		displayOptions: {
			show: {
				resource: [resources.productDiscount],
				[productDiscountFields.operation]: ['query'],
				[productDiscountFields.returnAll]: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Offset',
		name: productDiscountFields.offset,
		type: 'number',
		default: 0,
		typeOptions: { minValue: 0 },
		displayOptions: {
			show: {
				resource: [resources.productDiscount],
				[productDiscountFields.operation]: ['query'],
			},
		},
		description: 'Number of results to skip before returning results',
	},
	{
		displayName: 'Additional Fields',
		name: productDiscountFields.additionalFieldsGet,
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: [resources.productDiscount],
				[productDiscountFields.operation]: ['get', 'getByKey'],
			},
		},
		options: [
			{
				displayName: 'Expand',
				name: 'expand',
				type: 'string',
				default: '',
				description: 'Include additional resources by reference expansion',
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: productDiscountFields.additionalFieldsCreate,
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: [resources.productDiscount],
				[productDiscountFields.operation]: ['create'],
			},
		},
		options: [
			{
				displayName: 'Expand',
				name: 'expand',
				type: 'string',
				default: '',
				description: 'Include additional resources by reference expansion',
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: productDiscountFields.additionalFieldsUpdate,
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: [resources.productDiscount],
				[productDiscountFields.operation]: ['update', 'updateByKey'],
			},
		},
		options: [
			{
				displayName: 'Expand',
				name: 'expand',
				type: 'string',
				default: '',
				description: 'Include additional resources by reference expansion',
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: productDiscountFields.additionalFieldsDelete,
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: [resources.productDiscount],
				[productDiscountFields.operation]: ['delete', 'deleteByKey'],
			},
		},
		options: [
			{
				displayName: 'Expand',
				name: 'expand',
				type: 'string',
				default: '',
				description: 'Include additional resources by reference expansion',
			},
		],
	},
	{
		displayName: 'Version',
		name: productDiscountFields.version,
		type: 'number',
		required: true,
		default: 1,
		displayOptions: {
			show: {
				resource: [resources.productDiscount],
				[productDiscountFields.operation]: ['update', 'updateByKey', 'delete', 'deleteByKey'],
			},
		},
		description: 'The version of the product discount to update or delete',
	},
	{
		displayName: 'Actions (JSON)',
		name: productDiscountFields.actions,
		type: 'json',
		default: '[]',
		displayOptions: {
			show: {
				resource: [resources.productDiscount],
				[productDiscountFields.operation]: ['update', 'updateByKey'],
			},
		},
		description: 'An array of update actions to apply to the product discount',
	},
];
