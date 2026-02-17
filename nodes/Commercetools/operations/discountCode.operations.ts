import type { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { applyCommonParameters, coerceActions, coerceJsonInput } from '../utils/common.utils';
import { buildActionsFromUi } from '../utils/actionBuilder';

type CategoryOperationArgs = {
	operation: string;
	itemIndex: number;
	baseUrl: string;
};

export async function executeDiscountCodeOperation(
	this: IExecuteFunctions,
	{ operation, itemIndex, baseUrl }: CategoryOperationArgs,
): Promise<INodeExecutionData[]> {
	const results: INodeExecutionData[] = [];

	if (operation === 'create') {
		const additionalFieldsCreate = this.getNodeParameter(
			'discountCodeAdditionalFieldsCreate',
			itemIndex,
			{},
		) as IDataObject;
		const qs: IDataObject = {};
		applyCommonParameters(qs, additionalFieldsCreate);

		const draftRaw = this.getNodeParameter('discountCodeDraft', itemIndex);
		const draft = coerceJsonInput(this, draftRaw, 'Discount Code draft', itemIndex);

		const response = (await this.helpers.httpRequestWithAuthentication.call(
			this,
			'commerceToolsOAuth2Api',
			{
				method: 'POST',
				url: `${baseUrl}/discount-codes`,
				body: draft,
				qs,
			},
		)) as IDataObject;

		results.push({ json: response });
		return results;
	}

	if (operation === 'get' || operation === 'getByKey') {
		const additionalFieldsGet = this.getNodeParameter(
			'discountCodeAdditionalFieldsGet',
			itemIndex,
			{},
		) as IDataObject;
		const qs: IDataObject = {};
		applyCommonParameters(qs, additionalFieldsGet);

		const identifier =
			operation === 'get'
				? (this.getNodeParameter('discountCodeId', itemIndex) as string)
				: (this.getNodeParameter('discountCodeKey', itemIndex) as string);
		const url =
			operation === 'get'
				? `${baseUrl}/discount-codes/${identifier}`
				: `${baseUrl}/discount-codes/key=${encodeURIComponent(identifier)}`;

		const response = (await this.helpers.httpRequestWithAuthentication.call(
			this,
			'commerceToolsOAuth2Api',
			{
				method: 'GET',
				url,
				qs,
			},
		)) as IDataObject;

		results.push({ json: response });
		return results;
	}

	if (operation === 'query') {
		const returnAll = this.getNodeParameter('discountCodeReturnAll', itemIndex, false) as boolean;
		const limit = returnAll
			? 500
			: (this.getNodeParameter('discountCodeLimit', itemIndex, 50) as number);
		const offset = this.getNodeParameter('discountCodeOffset', itemIndex, 0) as number;
		const additionalFields = this.getNodeParameter(
			'discountCodeAdditionalFieldsQuery',
			itemIndex,
			{},
		) as IDataObject;

		const qs: IDataObject = { limit };

		if (offset) {
			qs.offset = offset;
		}

		applyCommonParameters(qs, additionalFields, {
			allowSort: true,
			allowWhere: true,
		});

		if (Object.prototype.hasOwnProperty.call(additionalFields, 'withTotal')) {
			qs.withTotal = additionalFields.withTotal as boolean;
		} else if (returnAll) {
			qs.withTotal = true;
		}

		const collected: IDataObject[] = [];
		let requestOffset = offset;
		let hasMore = true;

		do {
			const response = await this.helpers.httpRequestWithAuthentication.call(
				this,
				'commerceToolsOAuth2Api',
				{
					method: 'GET',
					url: `${baseUrl}/discount-codes`,
					qs: {
						...qs,
						offset: requestOffset,
					},
				},
			);

			const resultsPage = (response.results ?? response) as IDataObject[];

			if (!Array.isArray(resultsPage)) {
				throw new NodeOperationError(
					this.getNode(),
					'Unexpected response format from Commercetools API',
					{
						itemIndex,
					},
				);
			}

			collected.push(...resultsPage);

			if (!returnAll) {
				hasMore = false;
			} else {
				const received = resultsPage.length;
				if (received === 0) {
					hasMore = false;
				} else {
					requestOffset += received;
					const total = response.total as number | undefined;
					hasMore = total !== undefined ? requestOffset < total : received === limit;
				}
			}
		} while (returnAll && hasMore);

		results.push(...this.helpers.returnJsonArray(collected));
		return results;
	}

	if (operation === 'update' || operation === 'updateByKey') {
		const additionalFieldsUpdate = this.getNodeParameter(
			'discountCodeAdditionalFieldsUpdate',
			itemIndex,
			{},
		) as IDataObject;
		const qs: IDataObject = {};
		applyCommonParameters(qs, additionalFieldsUpdate);

		const version = this.getNodeParameter('version', itemIndex) as number;
		const rawActions = this.getNodeParameter('actions', itemIndex);
		const actionsUi = this.getNodeParameter('updateActions', itemIndex, {}) as IDataObject;
		const actionsFromJson = coerceActions(this, rawActions, itemIndex);
		const actionsFromUi = buildActionsFromUi(this, actionsUi);
		const actions = [...actionsFromJson, ...actionsFromUi];

		if (actions.length === 0) {
			throw new NodeOperationError(
				this.getNode(),
				'Provide at least one update action via Actions (JSON) or Actions (UI)',
				{ itemIndex },
			);
		}

		const body = {
			version,
			actions,
		};

		const identifierParam =
			operation === 'update'
				? (this.getNodeParameter('discountCodeId', itemIndex) as string)
				: (this.getNodeParameter('discountCodeKey', itemIndex) as string);
		const url =
			operation === 'update'
				? `${baseUrl}/discount-codes/${identifierParam}`
				: `${baseUrl}/discount-codes/key=${encodeURIComponent(identifierParam)}`;

		const response = (await this.helpers.httpRequestWithAuthentication.call(
			this,
			'commerceToolsOAuth2Api',
			{
				method: 'POST',
				url,
				body,
				qs,
			},
		)) as IDataObject;

		results.push({ json: response });
		return results;
	}

	if (operation === 'delete' || operation === 'deleteByKey') {
		const additionalFieldsDelete = this.getNodeParameter(
			'discountCodeAdditionalFieldsDelete',
			itemIndex,
			{},
		) as IDataObject;
		const qs: IDataObject = {};
		applyCommonParameters(qs, additionalFieldsDelete);

		const version = this.getNodeParameter('version', itemIndex) as number;
		qs.version = version;

		const identifierParam =
			operation === 'delete'
				? (this.getNodeParameter('discountCodeId', itemIndex) as string)
				: (this.getNodeParameter('discountCodeKey', itemIndex) as string);
		const url =
			operation === 'delete'
				? `${baseUrl}/discount-codes/${identifierParam}`
				: `${baseUrl}/discount-codes/key=${encodeURIComponent(identifierParam)}`;

		const response = (await this.helpers.httpRequestWithAuthentication.call(
			this,
			'commerceToolsOAuth2Api',
			{
				method: 'DELETE',
				url,
				qs,
			},
		)) as IDataObject;

		results.push({ json: response });
		return results;
	}

	throw new NodeOperationError(
		this.getNode(),
		`Unsupported operation for discount code resource: ${operation}`,
		{ itemIndex },
	);
}
