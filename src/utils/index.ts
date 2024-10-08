interface QueryType {
  params: {
    [key: string]: any;
  };
}

export function encodeQueryData({ params }: QueryType) {
  const entries = Object.entries(params);
  const query: string[] = entries.reduce((acc: string[], [key, value]) => {
    if (value === undefined || value === null) {
      return acc;
    }

    return acc.concat(`${key}=${value}`);
  }, []);

  return query.join("&");
}

export function dateFormat(date: string) {
  return date.split("T")[0];
}
