import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import axios from "axios";

interface Product {
    _id: string;
    title: string;
    price: number;
    image: string,
    description: string,
    category:string,
    createdAt: string;
}

interface ApiData {
    products: Product[];
    totalCount: number;
}
interface ApiResponse {
    data: ApiData;
}

const ProductList = () => {
    const [productData, setProductData] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>();
    const token = useSelector((state: RootState) => state.auth.token);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setpageCount] = useState(0);

    const handlePageClick = (event: { selected: number }) => setCurrentPage(event.selected);

    const getProductList = useCallback(async () => {
        const configHeaders = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        };
        if (!token) {
            setError("Token is missing");
            return;
        }
        try {
            const response = await axios.get<ApiResponse>(`${process.env.REACT_APP_API_URL}/api/products?page=${currentPage}&limit=10`, configHeaders);
            setProductData(response?.data?.data?.products);
            let totalPageCount = Math.ceil(response?.data?.data?.totalCount / 10);
            setpageCount(totalPageCount);
            setError(null);
        } catch (err) {
            console.log(err)
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    }, [token, currentPage]);

    useEffect(() => {
        getProductList();
    }, [getProductList]);


    return (
        <>

            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Overview</li>
                </ol>
            </nav>

            <div className="row my-4">
                <div className="col-12 col-xl-12 mb-4 mb-lg-0">
                    <div className="card">
                        <h5 className="card-header">User List</h5>
                        <div className="card-body">
                            <Table>
                                <thead>
                                    <tr><th>SNo</th><th>Title</th><th>Price</th><th>Category</th><th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(!error && productData?.length) ? (productData?.map((row, i) => {
                                        return <tr key={row._id}><td>{i + 1 + currentPage * 10}</td><td>{row?.title}</td><td>{row?.price}</td><td>{row?.category}</td><td>{row?.description}</td></tr>
                                    })) : (<><tr><td>No data or Something went wrong!</td></tr></>)}
                                </tbody>
                            </Table>
                            <ReactPaginate
                                previousLabel={"«"}
                                nextLabel={"»"}
                                breakLabel={"..."}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination justify-content-center mt-3"}
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                activeClassName={"active"}
                            />
                        </div>
                    </div>
                </div>


            </div>
        </>
    )

}

export default ProductList;