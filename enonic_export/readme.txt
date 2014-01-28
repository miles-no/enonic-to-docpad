Setup
-----

Setting up "Page (XML)"
1) Copy the xml.xsl to the page template folder (e.g. "page")
2) Create a page template that includes the xml.xsl file

Setting up portlets
-------------------
1) Copy the export_*.xsl files to the portlet folder (e.g. "objects")
2) Create a portlet "export_people" that includes the export_people.xsl file. Set the datasource to:
  <?xml version="1.0" encoding="UTF-8"?>
  <datasources>
    <datasource result-element="roles">
      <methodname>getContentByCategory</methodname>
      <parameters>
        <parameter name="categoryKeys" type="int[]">20</parameter>
        <parameter name="levels" type="int">1</parameter>
        <parameter name="query" type="string"/>
        <parameter name="orderBy" type="string"/>
        <parameter name="index" type="int">0</parameter>
        <parameter name="count" type="int">100</parameter>
        <parameter name="includeData" type="boolean">true</parameter>
        <parameter name="childrenLevel" type="int">1</parameter>
        <parameter name="parentLevel" type="int">0</parameter>
      </parameters>
    </datasource>
    <datasource>
      <methodname>getContentByCategory</methodname>
      <parameters>
        <parameter name="categoryKeys" type="int[]">18</parameter>
        <parameter name="levels" type="int">1</parameter>
        <parameter name="query" type="string"/>
        <parameter name="orderBy" type="string"/>
        <parameter name="index" type="int">0</parameter>
        <parameter name="count" type="int">9999</parameter>
        <parameter name="includeData" type="boolean">true</parameter>
        <parameter name="childrenLevel" type="int">1</parameter>
        <parameter name="parentLevel" type="int">0</parameter>
      </parameters>
    </datasource>
  </datasources>
2) Create a portlet "export_article" which includes the export_article.xsl file. Set the datasource to:
  <?xml version="1.0" encoding="UTF-8"?>
  <datasources>
    <datasource result-element="people">
      <methodname>getContentByCategory</methodname>
      <parameters>
        <parameter name="categoryKeys" type="int[]">18</parameter>
        <parameter name="levels" type="int">1</parameter>
        <parameter name="query" type="string"/>
        <parameter name="orderBy" type="string"/>
        <parameter name="index" type="int">0</parameter>
        <parameter name="count" type="int">1000</parameter>
        <parameter name="includeData" type="boolean">true</parameter>
        <parameter name="childrenLevel" type="int">1</parameter>
        <parameter name="parentLevel" type="int">0</parameter>
      </parameters>
    </datasource>
    <datasource>
      <methodname>getContentByCategory</methodname>
      <parameters>
        <parameter name="categoryKeys" type="int[]">2</parameter>
        <parameter name="levels" type="int">1</parameter>
        <parameter name="query" type="string"/>
        <parameter name="orderBy" type="string">publishfrom desc</parameter>
        <parameter name="index" type="int">0</parameter>
        <parameter name="count" type="int">9999</parameter>
        <parameter name="includeData" type="boolean">true</parameter>
        <parameter name="childrenLevel" type="int">1</parameter>
        <parameter name="parentLevel" type="int">0</parameter>
      </parameters>
    </datasource>
  </datasources>
3) Create a portlet "export_smiles" which includes the export_smiles.xsl file. Set the datasource to the same as in 2) except categoryKey set to 21 instead of 2.
4) Create a portlet "export_press" which includes the export_press.xml file. Set the datasource to the same as in 2) except categoryKey set to 37 instead of 2.
5) Create a new menu point called "export" of type etiquette
6) Create 4 new menu points of type "Page (XML)" under "export": "people", "news", "press" and "smiles". Set the region content to each of the four portlets respectively.

NB! Category keys may vary from site to site.