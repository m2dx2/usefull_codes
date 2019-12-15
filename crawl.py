def crawl_table(html):
    soup = bs4.BeautifulSoup(html, features="lxml")
    tables = soup.findAll("table")
    table_matrix = {}
    count = 0
    for table in tables:
        list_of_rows = []
        for row in table.findAll('tr')[1:]:
            list_of_cells = {}
            count1 = 0
            for cell in row.findAll('td'):
                text = cell.text.replace('&nbsp;', '')
                list_of_cells[column_name[count1]] = text
                count1 = count1 + 1
            list_of_rows.append(list_of_cells)
            count = count + 1
        table_matrix["data"] = list_of_rows
    return table_matrix
