USE [PruebaWeelo]
GO
/****** Object:  Table [dbo].[Owner]    Script Date: 02/08/2021 11:00:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Owner](
	[IdOwner] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NOT NULL,
	[Address] [varchar](255) NOT NULL,
	[Photo] [image] NULL,
	[Birthday] [date] NOT NULL,
 CONSTRAINT [PK_Owner] PRIMARY KEY CLUSTERED 
(
	[IdOwner] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Property]    Script Date: 02/08/2021 11:00:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Property](
	[IdProperty] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NOT NULL,
	[Address] [varchar](1024) NOT NULL,
	[Price] [decimal](18, 0) NOT NULL,
	[CodeInternal] [varchar](50) NOT NULL,
	[Year] [float] NOT NULL,
	[IdOwner] [int] NOT NULL,
 CONSTRAINT [PK_Property] PRIMARY KEY CLUSTERED 
(
	[IdProperty] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PropertyImage]    Script Date: 02/08/2021 11:00:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PropertyImage](
	[IdPropertyImage] [int] IDENTITY(1,1) NOT NULL,
	[IdProperty] [int] NOT NULL,
	[file] [image] NULL,
	[Enabled] [bit] NOT NULL,
 CONSTRAINT [PK_PropertyImage] PRIMARY KEY CLUSTERED 
(
	[IdPropertyImage] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[PropertyTrace]    Script Date: 02/08/2021 11:00:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[PropertyTrace](
	[IdPropertyTrace] [int] IDENTITY(1,1) NOT NULL,
	[DateSale] [datetime] NOT NULL,
	[Name] [varchar](1024) NOT NULL,
	[Value] [decimal](18, 0) NOT NULL,
	[Tax] [decimal](18, 0) NOT NULL,
	[IdProperty] [int] NOT NULL,
 CONSTRAINT [PK_PropertyTrace] PRIMARY KEY CLUSTERED 
(
	[IdPropertyTrace] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[User]    Script Date: 02/08/2021 11:00:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[User](
	[IdUser] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](50) NOT NULL,
	[UserPassword] [varchar](255) NOT NULL,
	[LastLogin] [datetime] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[IdUser] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[PropertyImage]  WITH CHECK ADD  CONSTRAINT [FK_PropertyImage_Property] FOREIGN KEY([IdProperty])
REFERENCES [dbo].[Property] ([IdProperty])
GO
ALTER TABLE [dbo].[PropertyImage] CHECK CONSTRAINT [FK_PropertyImage_Property]
GO
ALTER TABLE [dbo].[PropertyTrace]  WITH CHECK ADD  CONSTRAINT [FK_PropertyTrace_Property] FOREIGN KEY([IdProperty])
REFERENCES [dbo].[Property] ([IdProperty])
GO
ALTER TABLE [dbo].[PropertyTrace] CHECK CONSTRAINT [FK_PropertyTrace_Property]
GO
/****** Object:  StoredProcedure [dbo].[SP_Login]    Script Date: 02/08/2021 11:00:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Alvaro
-- Create date: 31/07/2021
-- Description:	Login usuario
-- =============================================
CREATE PROCEDURE [dbo].[SP_Login]
	@pUserName varchar(255),
	@pUserPassword varchar(1024)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT [IdUser]
		  ,[UserName]
		  ,[UserPassword]
		  ,[LastLogin]
	FROM [dbo].[User]
	WHERE [UserName] = @pUserName AND [UserPassword] = @pUserPassword
END

GO
/****** Object:  StoredProcedure [dbo].[SP_Owner_G]    Script Date: 02/08/2021 11:00:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Alvaro
-- Create date: 01/08/2021
-- Description:	Lista owners
-- =============================================
CREATE PROCEDURE [dbo].[SP_Owner_G]  
AS
BEGIN
	SET NOCOUNT ON;

	SELECT [IdOwner]
		  ,[Name]
		  ,[Address]
		  ,[Photo]
		  ,[Birthday]
	  FROM [dbo].[Owner]	
END

GO
/****** Object:  StoredProcedure [dbo].[SP_Owner_I]    Script Date: 02/08/2021 11:00:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Alvaro
-- Create date: 01/08/2021
-- Description:	Crear propiedad
-- =============================================
CREATE PROCEDURE [dbo].[SP_Owner_I] 
	@pName varchar(255)
	,@pAddress varchar(255)
	,@pPhoto image
	,@pBirthday date
AS
BEGIN
	SET NOCOUNT ON;
INSERT INTO [dbo].[Owner]
           ([Name]
           ,[Address]
           ,[Photo]
           ,[Birthday])
     VALUES
           (@pName
           ,@pAddress
           ,@pPhoto
           ,@pBirthday)

END

GO
/****** Object:  StoredProcedure [dbo].[SP_Property_G]    Script Date: 02/08/2021 11:00:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Alvaro
-- Create date: 01/08/2021
-- Description:	Lista de propiedades
-- =============================================
CREATE PROCEDURE [dbo].[SP_Property_G]
	@startIndex int
AS
BEGIN
	SET NOCOUNT ON;

	SELECT [IdProperty]
		,[Name]
		,[Address]
		,[Price]
		,[CodeInternal]
		,[Year]
		,[IdOwner]
	FROM [dbo].[Property]
	ORDER BY [IdProperty]
	OFFSET @startIndex ROWS FETCH NEXT 5 ROWS ONLY
END

GO
/****** Object:  StoredProcedure [dbo].[SP_Property_I]    Script Date: 02/08/2021 11:00:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Alvaro
-- Create date: 01/08/2021
-- Description:	Crear propiedad
-- =============================================
CREATE PROCEDURE [dbo].[SP_Property_I]
	-- Add the parameters for the stored procedure here
	 @pName varchar(255)
	,@pAddress varchar(1024)
	,@pPrice decimal(18,0)
	,@pCodeInternal varchar(50)
	,@pYear float
	,@pIdOwner int
AS
BEGIN

	SET NOCOUNT ON;
	
	INSERT INTO [dbo].[Property]
			([Name]
			,[Address]
			,[Price]
			,[CodeInternal]
			,[Year]
			,[IdOwner])
	VALUES
			(@pName
			,@pAddress
			,@pPrice
			,@pCodeInternal
			,@pYear
			,@pIdOwner)

	SELECT SCOPE_IDENTITY() AS Id
END

GO
