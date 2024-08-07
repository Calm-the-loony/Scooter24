"""Update tables

Revision ID: 62a6b25fdcc7
Revises: 92d868d8dd0e
Create Date: 2024-06-09 23:57:44.316566

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "62a6b25fdcc7"
down_revision = "92d868d8dd0e"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        "Product",
        "title_product",
        existing_type=sa.VARCHAR(length=200),
        type_=sa.String(length=500),
        existing_nullable=False,
    )
    op.alter_column(
        "Product",
        "explanation_product",
        existing_type=sa.VARCHAR(length=600),
        type_=sa.String(length=780),
        existing_nullable=True,
    )
    op.alter_column(
        "Product",
        "article_product",
        existing_type=sa.VARCHAR(length=150),
        type_=sa.String(length=300),
        existing_nullable=False,
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        "Product",
        "article_product",
        existing_type=sa.String(length=300),
        type_=sa.VARCHAR(length=150),
        existing_nullable=False,
    )
    op.alter_column(
        "Product",
        "explanation_product",
        existing_type=sa.String(length=780),
        type_=sa.VARCHAR(length=600),
        existing_nullable=True,
    )
    op.alter_column(
        "Product",
        "title_product",
        existing_type=sa.String(length=500),
        type_=sa.VARCHAR(length=200),
        existing_nullable=False,
    )
    # ### end Alembic commands ###