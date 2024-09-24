import AppLayout from "@/Components/AppLayout";

function AdminPage() {

    console.log('AdminPage');

    return (<>
        testxx
    </>);
}

AdminPage.layout = (page: React.ReactNode) => {
    return (
        <AppLayout
            children={page}
            title='Admin xx'
        />
    );
};