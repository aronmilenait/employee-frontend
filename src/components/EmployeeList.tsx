import { Employee } from "../interfaces/employeeInterface";
import { useEffect, useState } from "react";
import { getEmployees } from "../services/api";
import { Searchbar } from "./Searchbar";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [page, setPage] = useState(1);
  const limit = 15;
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployees(page, limit);
      const filteredEmployees = data.employees.filter(
        (employee: Employee) =>
          employee.first_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          employee.last_name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setEmployees(filteredEmployees);
    };
    fetchEmployees();
  }, [page, searchTerm]);

  return (
    <section className="bg-gradient-to-br from-blue-100 to-blue-200 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 sm:text-5xl mb-8 text-center">
          Employee List
        </h1>
        <div className="flex justify-center mb-4">
          <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <p className="text-gray-600 font-medium">
              Employees per page: {employees.length}
            </p>
          </div>
          <ul className="divide-y divide-gray-200">
            {employees.map((employee) => (
              <li
                key={employee.id}
                className="px-6 py-5 hover:bg-blue-50 transition duration-150 ease-in-out"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {employee.last_name[0]}
                      {employee.first_name[0]}
                    </span>
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex items-center">
                      <p className="text-lg font-medium text-gray-900">
                        {employee.last_name} {employee.first_name}
                      </p>
                      <span className="ml-2 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                        ID: {employee.id}
                      </span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-sm text-gray-600">
                        Joined:{" "}
                        {new Date(
                          employee.date_of_joining,
                        ).toLocaleDateString()}
                      </p>
                      <p className="text-sm font-medium text-blue-600">
                        Salary: ${employee.last_salary.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 border rounded-lg text-sm font-medium text-blue-700 bg-white border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
          >
            ← Previous
          </button>

          <span className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg shadow-sm">
            Page {page}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded-lg text-sm font-medium text-white bg-blue-600 border-transparent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
};
