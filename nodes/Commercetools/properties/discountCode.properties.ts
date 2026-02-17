import type { INodeProperties } from 'n8n-workflow';

export const discountCodeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create discount code',
				description: 'Create a new discount code draft',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete discount code',
				description: 'Delete a discount code by ID',
			},
			{
				name: 'Delete By Key',
				value: 'deleteByKey',
				action: 'Delete discount code by key',
				description: 'Delete a discount code using its unique key',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get discount code',
				description: 'Retrieve a discount code by ID',
			},
			{
				name: 'Get By Key',
				value: 'getByKey',
				action: 'Get discount code by key',
				description: 'Retrieve a discount code using its key',
			},
			{
				name: 'Query',
				value: 'query',
				action: 'Query discount codes',
				description: 'List discount codes using the Composable Commerce Categories endpoint',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update discount code',
				description: 'Perform update actions on a discount code by ID',
			},
			{
				name: 'Update By Key',
				value: 'updateByKey',
				action: 'Update discount code by key',
				description: 'Perform update actions on a discount code by key',
			},
		],
		default: 'query',
		displayOptions: {
			show: {
				resource: ['discountCode'],
			},
		},
	},
];

export const discountCodeBaseFields: INodeProperties[] = [
	{
		displayName: 'Discount Code ID',
		name: 'discountCodeId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['discountCode'],
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'Unique ID of the discount code to target',
	},
	{
		displayName: 'Discount Code Key',
		name: 'discountCodeKey',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['discountCode'],
				operation: ['getByKey', 'updateByKey', 'deleteByKey'],
			},
		},
		description: 'Unique key of the discount code to target',
	},
];
export const discountCodeDraftFields: INodeProperties[] = [
	{
		displayName: 'Discount Code Draft (JSON)',
		name: 'discountCodeDraft',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: ['discountCode'],
				operation: ['create'],
			},
		},
		description:
			'JSON representation of the discount code draft to create, e.g. <code>{"key" : "save10_code", "name":{"en":"Save 10"}...}</code>',
	},
];

export const discountCodeAdditionalFields: INodeProperties[] = [
	{
		displayName: 'Actions (UI)',
		name: 'updateActions',
		type: 'fixedCollection',
		default: {},
		placeholder: 'Add Action',
		typeOptions: {
			multipleValues: true,
		},
		description: 'Define multiple update actions to perform on the discount code',
		displayOptions: {
			show: {
				resource: ['discountCode'],
				operation: ['update', 'updateByKey'],
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
						default: 'setKey',
						options: [
							{
								name: 'Change CartDiscounts',
								value: 'changeCartDiscounts',
							},
							{
								name: 'Set Cart Predicate',
								value: 'setCartPredicate',
							},
							{
								name: 'Set Custom Field',
								value: 'setCustomField',
							},
							{
								name: 'Set Custom Type',
								value: 'setCustomType',
							},
							{
								name: 'Set Description',
								value: 'setDescription',
							},
							{
								name: 'Set Key',
								value: 'setKey',
							},
							{
								name: 'Set Max Applications',
								value: 'setMaxApplications',
							},
							{
								name: 'Set Max Applications Per Customer',
								value: 'setMaxApplicationsPerCustomer',
							},
							{
								name: 'Set Name',
								value: 'setName',
							},
						],
					},
					{
						displayName: 'Cart Predicate',
						name: 'cartPredicate',
						type: 'string',
						default: '',
						displayOptions: {
							show: {
								action: ['setCartPredicate', 'setAssetKey'],
							},
						},
						description: 'Value to set. If empty, any existing value will be removed.',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'fixedCollection',
						default: {},
						typeOptions: {
							multipleValues: true,
						},
						description: 'Localized discountCode descriptions',
						displayOptions: {
							show: {
								action: ['setDescription'],
							},
						},
						options: [
							{
								displayName: 'Localized Description',
								name: 'localizedField',
								values: [
									{
										displayName: 'Locale',
										name: 'locale',
										type: 'string',
										default: 'en',
										description: 'Locale code (e.g., en, de, fr)',
									},
									{
										displayName: 'Value',
										name: 'value',
										type: 'string',
										default: '',
										description: 'Description in this locale',
									},
								],
							},
						],
					},
					{
						displayName: 'Fields',
						name: 'fields',
						type: 'fixedCollection',
						default: {},
						placeholder: 'Add Field',
						typeOptions: {
							multipleValues: true,
						},
						description: 'Sets the Custom Fields fields for the Discount Code',
						displayOptions: {
							show: {
								action: ['setCustomType'],
							},
						},
						options: [
							{
								displayName: 'Field',
								name: 'field',
								values: [
									{
										displayName: 'Name',
										name: 'name',
										type: 'string',
										default: '',
										required: true,
										description: 'Name of the custom field',
									},
									{
										displayName: 'Value',
										name: 'value',
										type: 'string',
										default: '',
										description: 'Value to set for the custom field',
									},
								],
							},
						],
					},
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
						displayOptions: {
							show: {
								action: ['setKey'],
							},
						},
						description: 'Value to set. If empty, any existing value will be removed.',
					},
					{
						displayName: 'Max Applications',
						name: 'setMaxApplications',
						type: 'number',
						default: '',
						displayOptions: {
							show: {
								action: ['setMaxApplications'],
							},
						},
						description:
							'Value to set. If empty, any existing value will be removed and the DiscountCode can be applied any number of times. This field does not limit discount applications for Orders created from a Recurring Order.',
					},
					{
						displayName: 'Max Applications Per Customer',
						name: 'setMaxApplicationsPerCustomer',
						type: 'number',
						default: '',
						displayOptions: {
							show: {
								action: ['setMaxApplicationsPerCustomer'],
							},
						},
						description:
							'Value to set. If empty, any existing value will be removed and the DiscountCode can be applied any number of times. This field does not limit discount applications for Orders created from a Recurring Order.',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'fixedCollection',
						default: {},
						typeOptions: {
							multipleValues: true,
						},
						description: 'Localized discountCode names',
						displayOptions: {
							show: {
								action: ['changeName'],
							},
						},
						options: [
							{
								displayName: 'Localized Name',
								name: 'localizedField',
								values: [
									{
										displayName: 'Locale',
										name: 'locale',
										type: 'string',
										default: 'en',
										description: 'Locale code (e.g., en, de, fr)',
									},
									{
										displayName: 'Value',
										name: 'value',
										type: 'string',
										default: '',
										required: true,
										description: 'Discount Code name in this locale',
									},
								],
							},
						],
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						required: true,
						displayOptions: {
							show: {
								action: ['setCustomField'],
							},
						},
						description: 'Name of the Custom Field',
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'fixedCollection',
						default: {},
						description: 'Defines the Type that extends the Discount Code with Custom Fields',
						displayOptions: {
							show: {
								action: ['setCustomType'],
							},
						},
						options: [
							{
								displayName: 'Type Details',
								name: 'typeDetails',
								values: [
									{
										displayName: 'Type ID',
										name: 'typeId',
										type: 'hidden',
										default: 'type',
										description: 'Type identifier (always "type")',
									},
									{
										displayName: 'ID',
										name: 'id',
										type: 'string',
										default: '',
										required: true,
										placeholder: '',
										description: 'ID of the Type',
									},
								],
							},
						],
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						displayOptions: {
							show: {
								action: ['setCustomField'],
							},
						},
						description:
							'If value is absent or null, this field will be removed if it exists. Removing a field that does not exist returns an InvalidOperation error. If value is provided, it is set for the field defined by name.',
					},
				],
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'discountCodeAdditionalFieldsQuery',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'Custom Query Parameters',
				name: 'customParameters',
				type: 'fixedCollection',
				default: {},
				placeholder: 'Add Parameter',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'parameter',
						displayName: 'Parameter',
						values: [
							{
								displayName: 'Key',
								name: 'key',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
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
				description: 'Query predicate to filter categories',
			},
			{
				displayName: 'With Total',
				name: 'withTotal',
				type: 'boolean',
				default: true,
				description: 'Whether the query should calculate the total number of matching categories',
			},
		],
		displayOptions: {
			show: {
				resource: ['discountCode'],
				operation: ['query'],
			},
		},
	},
	{
		displayName: 'Return All',
		name: 'discountCodeReturnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['discountCode'],
				operation: ['query'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'discountCodeLimit',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
		displayOptions: {
			show: {
				resource: ['discountCode'],
				operation: ['query'],
				discountCodeReturnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Offset',
		name: 'discountCodeOffset',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				resource: ['discountCode'],
				operation: ['query'],
			},
		},
		description: 'Number of categories to skip before returning results',
	},
	{
		displayName: 'Additional Fields',
		name: 'discountCodeAdditionalFieldsGet',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'Custom Query Parameters',
				name: 'customParameters',
				type: 'fixedCollection',
				default: {},
				placeholder: 'Add Parameter',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'parameter',
						displayName: 'Parameter',
						values: [
							{
								displayName: 'Key',
								name: 'key',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
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
		],
		displayOptions: {
			show: {
				resource: ['discountCode'],
				operation: ['get', 'getByKey'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'discountCodeAdditionalFieldsCreate',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'Custom Query Parameters',
				name: 'customParameters',
				type: 'fixedCollection',
				default: {},
				placeholder: 'Add Parameter',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'parameter',
						displayName: 'Parameter',
						values: [
							{
								displayName: 'Key',
								name: 'key',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
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
		],
		displayOptions: {
			show: {
				resource: ['discountCode'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'discountCodeAdditionalFieldsUpdate',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'Custom Query Parameters',
				name: 'customParameters',
				type: 'fixedCollection',
				default: {},
				placeholder: 'Add Parameter',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'parameter',
						displayName: 'Parameter',
						values: [
							{
								displayName: 'Key',
								name: 'key',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
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
		],
		displayOptions: {
			show: {
				resource: ['discountCode'],
				operation: ['update', 'updateByKey'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'discountCodeAdditionalFieldsDelete',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'Custom Query Parameters',
				name: 'customParameters',
				type: 'fixedCollection',
				default: {},
				placeholder: 'Add Parameter',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'parameter',
						displayName: 'Parameter',
						values: [
							{
								displayName: 'Key',
								name: 'key',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
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
		],
		displayOptions: {
			show: {
				resource: ['discountCode'],
				operation: ['delete', 'deleteByKey'],
			},
		},
	},
];
