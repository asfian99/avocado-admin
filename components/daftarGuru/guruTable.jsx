import React, { useState, useMemo } from "react";
import NextLink from "next/link";
import Moment from "react-moment";
import { useRouter } from "next/router";
import CardWrapper from "../cardWrapper";
import { ChevronUpIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Spacer,
  InputGroup,
  InputLeftAddon,
  Input,
  Heading,
  Link,
} from "@chakra-ui/react";

// MAIN COMPONENT
function SiswaTable({ data }) {
  const router = useRouter();
  // DATA YANG DITAMPILKAN DI TABLE
  const newData = data.map((guruData, i) => {
    const classr = guruData.classroom?.kelas ? guruData.classroom.kelas : "-";
    return {
      nama: guruData.nama,
      alamat: guruData.alamat,
      kelas: classr,
      detail: (
        <NextLink href={`${router.pathname}/${guruData.id}`}>
          <Link color="teal.500" fontWeight="medium">
            Detail
          </Link>
        </NextLink>
      ),
    };
  });
  const rowsData = useMemo(() => newData, [data]);
  const columns = useMemo(
    () => [
      { Header: "Nama", accessor: "nama" },
      { Header: "Alamat", accessor: "alamat" },
      { Header: "Kelas", accessor: "kelas" },
      { Header: "Detail", accessor: "detail" },
    ],
    []
  );

  // INISIALISASI REACT-TABLE
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    { columns: columns, data: rowsData },
    useGlobalFilter,
    useSortBy
  );

  return (
    <>
      <CardWrapper>
        <Flex align="center">
          <Heading fontSize="xl" mb="4" textAlign="center">
            Daftar Guru
          </Heading>
          <Spacer />

          {/* Search */}
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </Flex>

        {/* TEST */}
        <Table {...getTableProps()} size="sm" variant="simple">
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()} bgColor="gray.100">
                {headerGroup.headers.map((column) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    py="4"
                  >
                    {column.render("Header")}
                    {/* Sorting indikator */}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ChevronDownIcon ml="2" w="4" h="4" />
                        ) : (
                          <ChevronUpIcon ml="2" w="4" h="4" />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>

          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </CardWrapper>
    </>
  );
}

// COMPONENT UNTUK GLOBAL SEARCH DAN MENAMPILKAN SEARCHBAR
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <InputGroup w="40%" textTransform="capitalize" rounded="lg">
      <InputLeftAddon
        children={<SearchIcon color="gray.600" />}
        bgColor="gray.100"
      />
      <Input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Nama, Kelas, atau Alamat...`}
        variant="outline"
        mb="4"
      />
    </InputGroup>
  );
}

export default SiswaTable;
