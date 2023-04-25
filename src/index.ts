type TypeOfObjectString = { [key: string]: string };

class BimaDB {
  table = "";
  where: { [key: string]: string } = {};
  apiURL = "";

  from = (table: string) => {
    this.table = table;

    return this;
  };

  eq = (key: string, value: string) => {
    this.where[key] = value;

    return this;
  };

  clearProps = () => {
    this.table = "";
    this.where = {};
  };

  constructor(apiURL: string) {
    this.apiURL = apiURL;
  }

  doUpdate = async (
    data: TypeOfObjectString
  ): Promise<{ msg: { count: number } }> => {
    return new Promise(async (resolve, reject) => {
      fetch(`${this.apiURL}${this.table}/update`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
          where: this.where,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          this.clearProps();
          resolve(result);
        })
        .catch((err) => {
          this.clearProps();
          reject(err);
        });
    });
  };

  doDelete = async (): Promise<{ msg: { count: number } }> => {
    return new Promise(async (resolve, reject) => {
      fetch(`${this.apiURL}${this.table}/delete`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          where: this.where,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          this.clearProps();
          resolve(result);
        })
        .catch((err) => {
          this.clearProps();
          reject(err);
        });
    });
  };

  doInsert = async (data: TypeOfObjectString[]): Promise<{ msg: number }> => {
    return new Promise(async (resolve, reject) => {
      fetch(`${this.apiURL}${this.table}/insert`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          this.clearProps();
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
          this.clearProps();
          reject(err);
        });
    });
  };

  doGet = async (
    columns: string[] = ["*"]
  ): Promise<{ [key: string]: any }[]> => {
    return new Promise(async (resolve, reject) => {
      fetch(`${this.apiURL}${this.table}/get`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          where: this.where,
          columns,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          this.clearProps();
          resolve(result);
        })
        .catch((err) => {
          this.clearProps();
          reject(err);
        });
    });
  };
}

export default BimaDB;