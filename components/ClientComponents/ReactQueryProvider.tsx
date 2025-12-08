'use client'

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ChildrenAndClassNamePropsType} from "@/types/ChildrenAndClassNamePropsType";

const queryClient = new QueryClient()

function ReactQueryProvider({children}: Pick<ChildrenAndClassNamePropsType, 'children'>) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider