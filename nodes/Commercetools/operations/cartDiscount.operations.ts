import type { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { applyCommonParameters, coerceActions, coerceJsonInput } from '../utils/common.utils';
import { buildActionsFromUi } from '../utils/actionBuilder';
import { cartDiscountFields } from '../properties/cartDiscount.constants';

type CartDiscountOperationArgs = {
	operation: string;
	itemIndex: number;
	baseUrl: string;
};

export async function executeCartDiscountOperation(
	this: IExecuteFunctions,
	{ operation, itemIndex, baseUrl }: CartDiscountOperationArgs,
): Promise<INodeExecutionData[]> {
	const results: INodeExecutionData[] = [];

	if (operation === 'create') {
		const additionalFields = this.getNodeParameter(
			cartDiscountFields.additionalFieldsCreate,
			itemIndex,
			{},
		) as IDataObject;
		const qs: IDataObject = {};
		applyCommonParameters(qs, additionalFields);

		const draftRaw = this.getNodeParameter(cartDiscountFields.cartDiscountDraft, itemIndex);
		const draft = coerceJsonInput(this, draftRaw, 'Cart Discount draft', itemIndex);

		const response = (await this.helpers.httpRequestWithAuthentication.call(
			this,
			'commerceToolsOAuth2Api',
			{
				method: 'POST',
				url: `${baseUrl}/cart-discounts`,
				body: draft,
				qs,
			},
		)) as IDataObject;

		results.push({ json: response });
		return results;
	}

	if (operation === 'get' || operation === 'getByKey') {
		const additionalFields = this.getNodeParameter(
			cartDiscountFields.additionalFieldsGet,
			itemIndex,
			{},
		) as IDataObject;
		const qs: IDataObject = {};
		applyCommonParameters(qs, additionalFields);

		const identifier =
			operation === 'get'
				? (this.getNodeParameter(cartDiscountFields.cartDiscountId, itemIndex) as string)
				: (this.getNodeParameter(cartDiscountFields.cartDiscountKey, itemIndex) as string);
		const url =
			operation === 'get'
				? `${baseUrl}/cart-discounts/${identifier}`
				: `${baseUrl}/cart-discounts/key=${encodeURIComponent(identifier)}`;

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
		const returnAll = this.getNodeParameter(
			cartDiscountFields.returnAll,
			itemIndex,
			false,
		) as boolean;
		const limit = returnAll
			? 500
			: (this.getNodeParameter(cartDiscountFields.limit, itemIndex, 50) as number);
		const offset = this.getNodeParameter(cartDiscountFields.offset, itemIndex, 0) as number;
		const additionalFields = this.getNodeParameter(
			cartDiscountFields.additionalFieldsQuery,
			itemIndex,
			{},
		) as IDataObject;

		const qs: IDataObject = { limit };

		if (offset) {
			qs.offset = offset;
		}

		applyCommonParameters(qs, additionalFields, { allowSort: true, allowWhere: true });

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
					url: `${baseUrl}/cart-discounts`,
					qs: { ...qs, offset: requestOffset },
				},
			);

			const resultsPage = (response.results ?? response) as IDataObject[];
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
		const additionalFields = this.getNodeParameter(
			cartDiscountFields.additionalFieldsUpdate,
			itemIndex,
			{},
		) as IDataObject;
		const qs: IDataObject = {};
		applyCommonParameters(qs, additionalFields);

		const version = this.getNodeParameter(cartDiscountFields.version, itemIndex) as number;
		const rawActions = this.getNodeParameter(cartDiscountFields.actions, itemIndex);
		const actionsUi = this.getNodeParameter(
			cartDiscountFields.updateActions,
			itemIndex,
			{},
		) as IDataObject;
		const actionsFromJson = coerceActions(this, rawActions, itemIndex);
		const actionsFromUi = buildActionsFromUi(this, actionsUi);
		const actions = [...actionsFromJson, ...actionsFromUi];

		if (actions.length === 0) {
			throw new NodeOperationError(this.getNode(), 'Provide at least one update action', {
				itemIndex,
			});
		}

		const body = { version, actions };
		const identifier =
			operation === 'update'
				? (this.getNodeParameter(cartDiscountFields.cartDiscountId, itemIndex) as string)
				: (this.getNodeParameter(cartDiscountFields.cartDiscountKey, itemIndex) as string);
		const url =
			operation === 'update'
				? `${baseUrl}/cart-discounts/${identifier}`
				: `${baseUrl}/cart-discounts/key=${encodeURIComponent(identifier)}`;

		const response = (await this.helpers.httpRequestWithAuthentication.call(
			this,
			'commerceToolsOAuth2Api',
			{ method: 'POST', url, body, qs },
		)) as IDataObject;
		results.push({ json: response });
		return results;
	}

	if (operation === 'delete' || operation === 'deleteByKey') {
		const additionalFields = this.getNodeParameter(
			cartDiscountFields.additionalFieldsDelete,
			itemIndex,
			{},
		) as IDataObject;
		const qs: IDataObject = {};
		applyCommonParameters(qs, additionalFields);

		qs.version = this.getNodeParameter(cartDiscountFields.version, itemIndex) as number;

		const identifier =
			operation === 'delete'
				? (this.getNodeParameter(cartDiscountFields.cartDiscountId, itemIndex) as string)
				: (this.getNodeParameter(cartDiscountFields.cartDiscountKey, itemIndex) as string);
		const url =
			operation === 'delete'
				? `${baseUrl}/cart-discounts/${identifier}`
				: `${baseUrl}/cart-discounts/key=${encodeURIComponent(identifier)}`;

		const response = (await this.helpers.httpRequestWithAuthentication.call(
			this,
			'commerceToolsOAuth2Api',
			{ method: 'DELETE', url, qs },
		)) as IDataObject;
		results.push({ json: response });
		return results;
	}

	throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`, {
		itemIndex,
	});
}
