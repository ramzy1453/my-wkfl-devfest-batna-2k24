import axios from "axios";

//test routes and fix types

class Workflowaction {
  private static baseUrl = "";

  static setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  static async fetchAll(): Promise<Workflows[]> {
    try {
      const response = await axios.get(`${this.baseUrl}`);
      return response.data.map(
        (workflow: {
          id: string;
          name: string;
          description: string;
          createdAt: string;
        }) => ({
          id: workflow.id,
          name: workflow.name,
          description: workflow.description,
          createdAt: new Date(workflow.createdAt),
        })
      );
    } catch (error) {
      console.error("Error fetching workflows:", error);
      throw error;
    }
  }

  static async fetch(id: string): Promise<Workflow> {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`);

      return {
        id: response.data.id,
        components: response.data.components,
      };
    } catch (error) {
      console.error(`Error fetching workflow with ID ${id}:`, error);
      throw error;
    }
  }
  static async Create(data: object) {
    console.log(data);
    //illask about how i can match the type of the form and the workflwo
    try {
      //   const response = await axios.post(`${this.baseUrl}`, data);
      //   const msg = response.data;
      return {
        message: "success",
      };
    } catch (error) {
      console.error("Error creating workflow:", error);
      throw error;
    }
  }
  static async save(data: Workflow) {
    try {
      const response = await axios.put(`${this.baseUrl}/${data.id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error saving workflow with ID ${data.id}:`, error);
      throw error;
    }
  }
}
export default Workflowaction;
