import { Helmet } from 'react-helmet';



function Meta({ title, description, keywords }) {
    return(<>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
    
    
    </>)
}

Meta.defaultProps = {
    title: 'Welcome To yoShop',
    description: 'the best modern shopping website in malawi!!',
    keywords: 'assorted items, safest e-commerce site, reliable for your convinience',
  };
  

export default Meta