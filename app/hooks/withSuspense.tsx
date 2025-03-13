import { Suspense, ComponentType } from "react";

const withSuspense = <P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => {
  const SuspenseComponent = (props: P) => (
    <Suspense fallback={"Loading..."}>
      <WrappedComponent {...props} />
    </Suspense>
  );

  SuspenseComponent.displayName = `WithSuspense(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return SuspenseComponent;
};

export default withSuspense;
