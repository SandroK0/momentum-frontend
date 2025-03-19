type RefetchFunction = () => Promise<void>;

let refetchEmployees: RefetchFunction | null = null;

export const setRefetchEmployees = (fn: RefetchFunction) => {
  refetchEmployees = fn;
};

export const triggerRefetchEmployees = async () => {
  if (refetchEmployees) {
    await refetchEmployees();
  }
};