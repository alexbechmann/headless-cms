import { action } from 'typesafe-actions';
import { EntityListFilter } from '../models/entity-list-filter.model';
import { EntitySchema } from '@refract-cms/core';

export const SET_ORDERBY = '@@CMS/ENTITIES/SET_ORDERBY';
export const SET_ORDERBY_DIRECTION = '@@CMS/ENTITIES/SET_ORDERBY_DIRECTION';
export const ADD_FILTER = '@@CMS/ENTITIES/ADD_FILTER';
export const UPDATE_FILTER = '@@CMS/ENTITIES/UPDATE_FILTER';

export const setOrderByField = (args: { alias: string; orderByField: string }) => {
  return action(SET_ORDERBY, args);
};

export const setOrderByDirection = (args: { alias: string; direction: 'ASC' | 'DESC' }) => {
  return action(SET_ORDERBY_DIRECTION, args);
};

export const addFilter = ({ schema }: { schema: EntitySchema<any> }) => {
  return action(ADD_FILTER, {
    alias: schema.options.alias,
    filter: {
      propertyKey: Object.keys(schema.properties)[0] || '',
      operater: 'eq',
      value: ''
    } as EntityListFilter
  });
};

export const updateFilter = (args: { alias: string; filter: EntityListFilter; index: number }) => {
  return action(UPDATE_FILTER, args);
};
