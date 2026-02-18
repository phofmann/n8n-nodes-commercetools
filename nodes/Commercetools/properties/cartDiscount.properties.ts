import type { INodeProperties } from 'n8n-workflow';
import { cartDiscountFields } from './cartDiscount.constants';
import { resources } from '../resources.constants';

export const cartDiscountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: cartDiscountFields.operation,
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create cart discount',
				description: 'Create a new cart discount',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete cart discount',
				description: 'Delete a cart discount by ID',
			},
			{
				name: 'Delete By Key',
				value: 'deleteByKey',
				action: 'Delete cart discount by key',
				description: 'Delete a cart discount using its unique key',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get cart discount',
				description: 'Retrieve a cart discount by ID',
			},
			{
				name: 'Get By Key',
				value: 'getByKey',
				action: 'Get cart discount by key',
				description: 'Retrieve a cart discount using its key',
			},
			{
				name: 'Query',
				value: 'query',
				action: 'Query cart discounts',
				description: 'Query for cart discounts',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update cart discount',
				description: 'Update a cart discount by ID',
			},
			{
				name: 'Update By Key',
				value: 'updateByKey',
				action: 'Update cart discount by key',
				description: 'Update a cart discount by key',
			},
		],
		default: 'query',
		displayOptions: {
			show: {
				resource: [resources.cartDiscount],
			},
		},
	},
];

export const cartDiscountBaseFields: INodeProperties[] = [
	{
		displayName: 'Cart Discount ID',
		name: cartDiscountFields.cartDiscountId,
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [resources.cartDiscount],
				[cartDiscountFields.operation]: ['get', 'update', 'delete'],
			},
		},
		description: 'Unique ID of the cart discount to target',
	},
	{
		displayName: 'Cart Discount Key',
		name: cartDiscountFields.cartDiscountKey,
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [resources.cartDiscount],
				[cartDiscountFields.operation]: ['getByKey', 'updateByKey', 'deleteByKey'],
			},
		},
		description: 'Unique key of the cart discount to target',
	},
];

export const cartDiscountDraftFields: INodeProperties[] = [
	{
		displayName: 'Cart Discount Draft (JSON)',
		name: cartDiscountFields.cartDiscountDraft,
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: [resources.cartDiscount],
				[cartDiscountFields.operation]: ['create'],
			},
		},
		description:
			'JSON representation of the cart discount draft to create, e.g. <code>{"name":{"en":"10% off"},"value":{...},"cartPredicate":"...","sortOrder":"0.1","requiresDiscountCode":true}</code>',
	},
];

export const cartDiscountAdditionalFields: INodeProperties[] = [
	{
		displayName: 'Actions (UI)',
		name: cartDiscountFields.updateActions,
		type: 'fixedCollection',
		default: {},
		placeholder: 'Add Action',
		typeOptions: {
			multipleValues: true,
		},
		description: 'Define multiple update actions to perform on the cart discount',
		displayOptions: {
			show: {
				resource: [resources.cartDiscount],
				[cartDiscountFields.operation]: ['update', 'updateByKey'],
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
							{ name: 'Change Cart Predicate', value: 'changeCartPredicate' },
							{ name: 'Change Is Active', value: 'changeIsActive' },
							{ name: 'Change Name', value: 'changeName' },
							{ name: 'Change Requires Discount Code', value: 'changeRequiresDiscountCode' },
							{ name: 'Change Sort Order', value: 'changeSortOrder' },
							{ name: 'Change Stacking Mode', value: 'changeStackingMode' },
							{ name: 'Change Target', value: 'changeTarget' },
							{ name: 'Change Value', value: 'changeValue' },
							{ name: 'Set Custom Field', value: 'setCustomField' },
							{ name: 'Set Custom Type', value: 'setCustomType' },
							{ name: 'Set Description', value: 'setDescription' },
							{ name: 'Set Key', value: 'setKey' },
							{ name: 'Set Stores', value: 'setStores' },
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
							'Localized names for the cart discount, e.g. <code>{"en": "10% Off"}</code>',
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
		name: cartDiscountFields.additionalFieldsQuery,
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: [resources.cartDiscount],
				[cartDiscountFields.operation]: ['query'],
			},
		},
		options: [
			{
				displayName: 'Custom Query Parameters',
				name: 'customParameters',
				type: 'fixedCollection',
				default: {},
				placeholder: 'Add Parameter',
				typeOptions: { multipleValues: true },
				options: [
					{
						name: 'parameter',
						displayName: 'Parameter',
						values: [
							{ displayName: 'Key', name: 'key', type: 'string', default: '' },
							{ displayName: 'Value', name: 'value', type: 'string', default: '' },
						],
					},
				],
			},
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
			{
				displayName: 'With Total',
				name: 'withTotal',
				type: 'boolean',
				default: true,
				description: 'Whether the query should calculate the total number of matching entries',
			},
		],
	},
	{
		displayName: 'Return All',
		name: cartDiscountFields.returnAll,
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: [resources.cartDiscount],
				[cartDiscountFields.operation]: ['query'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: cartDiscountFields.limit,
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
		displayOptions: {
			show: {
				resource: [resources.cartDiscount],
				[cartDiscountFields.operation]: ['query'],
				[cartDiscountFields.returnAll]: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Offset',
		name: cartDiscountFields.offset,
		type: 'number',
		default: 0,
		typeOptions: { minValue: 0 },
		displayOptions: {
			show: {
				resource: [resources.cartDiscount],
				[cartDiscountFields.operation]: ['query'],
			},
		},
		description: 'Number of results to skip before returning results',
	},
	{
		displayName: 'Additional Fields',
		name: cartDiscountFields.additionalFieldsGet,
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: [resources.cartDiscount],
				[cartDiscountFields.operation]: ['get', 'getByKey'],
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
		name: cartDiscountFields.additionalFieldsCreate,
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: [resources.cartDiscount],
				[cartDiscountFields.operation]: ['create'],
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
		name: cartDiscountFields.additionalFieldsUpdate,
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: [resources.cartDiscount],
				[cartDiscountFields.operation]: ['update', 'updateByKey'],
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
		name: cartDiscountFields.additionalFieldsDelete,
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: [resources.cartDiscount],
				[cartDiscountFields.operation]: ['delete', 'deleteByKey'],
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
		name: cartDiscountFields.version,
		type: 'number',
		required: true,
		default: 1,
		displayOptions: {
			show: {
				resource: [resources.cartDiscount],
				[cartDiscountFields.operation]: ['update', 'updateByKey', 'delete', 'deleteByKey'],
			},
		},
		description: 'The version of the cart discount to update or delete',
	},
	{
		displayName: 'Actions (JSON)',
		name: cartDiscountFields.actions,
		type: 'json',
		default: '[]',
		displayOptions: {
			show: {
				resource: [resources.cartDiscount],
				[cartDiscountFields.operation]: ['update', 'updateByKey'],
			},
		},
		description: 'An array of update actions to apply to the cart discount',
	},
];
