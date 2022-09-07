/* eslint-disable react/display-name */
import React, { useRef } from 'react'
import {
  MutationDefinition,
  QueryDefinition,
} from '@reduxjs/toolkit/dist/query'
import {
  UseMutation,
  UseQuery,
} from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { TagType } from '../redux/api'
import { CustomBaseQueryType } from '../redux/axiosBaseQuery'
import {
  GetQueryResult,
  GetMutationArgs,
  GetMutationResult,
} from '../redux/typeHelpers'
import Preloader from '../components/Preloader'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'

interface PrivateResolverProps {
  containsFetching?: boolean
  containsError?: boolean
  onRefetch?: () => void
}

interface ResolverProps<TQueryArg> {
  disableLoading?: boolean
  queryArg: TQueryArg
}

export interface WithQueryResolverData<
  T extends UseQuery<QueryDefinition<any, CustomBaseQueryType, TagType, any>>,
> {
  queryData: GetQueryResult<T>
}

export const withQueryResolver =
  <TQueryArg, TResult>(
    useQuery: UseQuery<
      QueryDefinition<TQueryArg, CustomBaseQueryType, TagType, TResult>
    >,
  ) =>
  <TComponentProps,>(
    Component: React.FunctionComponent<
      WithQueryResolverData<typeof useQuery> & TQueryArg & TComponentProps
    >,
  ) =>
  (
    props: PrivateResolverProps &
      ResolverProps<TQueryArg> &
      Omit<
        TComponentProps,
        keyof (WithQueryResolverData<typeof useQuery> & TQueryArg)
      >,
  ) => {
    const {
      queryArg,
      containsError,
      disableLoading,
      containsFetching,
      onRefetch,
      ...otherProps
    } = props
    const {
      data,
      isError: isQueryError,
      isFetching: isQueryFetching,
      isSuccess,
      refetch,
    } = useQuery(queryArg, { skip: disableLoading })

    const isFetching = isQueryFetching || Boolean(containsFetching)
    const isError = isQueryError || Boolean(containsError)

    const tryRefetch = () => {
      if (!isSuccess) {
        console.debug('refetch 1')
        refetch()
      }
      onRefetch && onRefetch()
    }

    if (isFetching) {
      console.debug('loading')
      return <Preloader />
    }

    if (isError) {
      return <div>Error</div>
    }

    const HackComponent = Component as any

    return (
      <ThemeProvider theme={theme}>
        <HackComponent queryData={data} {...queryArg} {...otherProps} />
      </ThemeProvider>
    )
  }

export const withOtherQueryResolver =
  <TQueryArg, TResult>(
    useQuery: UseQuery<
      QueryDefinition<TQueryArg, CustomBaseQueryType, TagType, TResult>
    >,
  ) =>
  <TComponentProps, TOtherQueryArg>(
    Component: React.FunctionComponent<
      PrivateResolverProps & ResolverProps<TOtherQueryArg> & TComponentProps
    >,
  ) =>
  (
    props: { queryArg: TQueryArg & TOtherQueryArg } & TComponentProps &
      PrivateResolverProps,
  ) => {
    const {
      queryArg,
      containsError: otherError,
      containsFetching: otherFetching,
      onRefetch: onOtherRefetch,
      ...otherProps
    } = props
    const { data, isError, isFetching, isSuccess, error, refetch } =
      useQuery(queryArg)

    const onRefetch = () => {
      if (isError) {
        refetch()
        console.debug('refetch 2')
      }

      if (otherError) {
        onOtherRefetch && onOtherRefetch()
        console.debug('refetch other')
      }
    }

    const HackComponent = Component as any

    return (
      <ThemeProvider theme={theme}>
        <HackComponent
          queryArg={queryArg}
          containsFetching={isFetching || otherFetching}
          containsError={isError || otherError}
          onRefetch={onRefetch}
          {...otherProps}
        />
      </ThemeProvider>
    )
  }

export interface WithMutationResolverProps<
  T extends UseMutation<
    MutationDefinition<any, CustomBaseQueryType, TagType, any>
  >,
> {
  mutationProps: {
    mutate: (args: GetMutationArgs<T>) => Promise<GetMutationResult<T>>
    showRetryModal: (retry: () => void) => void
    isLoading: boolean
    isSuccess: boolean
    data: GetMutationResult<T> | undefined
    reset: () => void
  }
}

interface MutationResolverProps {}

export const withMutationResolver =
  <TMutationArg, TResult>(
    useMutation: UseMutation<
      MutationDefinition<TMutationArg, CustomBaseQueryType, TagType, TResult>
    >,
    errorMessage: string,
  ) =>
  <TComponentProps,>(
    Component: React.FunctionComponent<
      WithMutationResolverProps<typeof useMutation> & TComponentProps
    >,
  ) =>
  (
    props: MutationResolverProps &
      Omit<
        TComponentProps,
        keyof WithMutationResolverProps<typeof useMutation>
      >,
  ) => {
    const [mutate, mutationArgs] = useMutation()
    const { data, isLoading, isError, isSuccess, originalArgs, reset } =
      mutationArgs

    const onMutate = (args: TMutationArg) => mutate(args).unwrap()

    const { ...otherProps } = props
    const { current } = useRef<{ retryFunc: (() => void) | null }>({
      retryFunc: null,
    })

    const onRetry = () => {
      current.retryFunc && current.retryFunc()
    }

    const showRetryModal = (retry: () => void) => {
      current.retryFunc = retry
    }

    //TODO: don't know how to fix
    const HackComponent = Component as any

    return (
      <>
        <HackComponent
          mutationProps={{
            mutate: onMutate,
            showRetryModal: showRetryModal,
            isLoading: isLoading,
            isSuccess: isSuccess,
            data: data,
            reset: reset,
          }}
          {...otherProps}
        />
      </>
    )
  }
